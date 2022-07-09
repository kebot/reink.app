import request from 'request-promise'
import crypto from 'crypto'
import OAuth from 'oauth-1.0a'

module.exports = class Instapaper {
  baseURL = 'https://www.instapaper.com/api/';
  // user = null;
  // password = null;
  token = null;
  authorizing = null;

  user: string | null = null
  password: string | null = null

  consumerKey:string
  consumerSecret:string
  oauth: OAuth

  constructor(consumerKey: string, consumerSecret: string) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.oauth = this.createOAuth();
  }

  createOAuth = () => {
    return new OAuth({
      consumer: { key: this.consumerKey, secret: this.consumerSecret },
      signature_method: 'HMAC-SHA1',
      hash_function: (base_string, key) =>
        crypto.createHmac('sha1', key).update(base_string).digest('base64'),
    });
  };

  setCredentials(user: string, password: string) {
    this.user = user;
    this.password = password;
  }

  authorize = () => {
    return new Promise((resolve, reject) => {
      if (this.token) {
        return resolve(this);
      }

      if (this.authorizing) {
        return resolve(this.authorizing);
      }

      if (!this.user || !this.password) {
        return reject('please input valid username and password');
      }

      const options = this.buildAuthOption('1/oauth/access_token', {
        format: 'qline',
        data: {
          x_auth_username: this.user,
          x_auth_password: this.password,
          x_auth_mode: 'client_auth',
        },
      });

      this.authorizing = request(options)
        .then((data) => {
          const token = data.split('&').reduce((acc, current) => {
            const [key, val] = current.split('=');
            acc[key] = val;
            return acc;
          }, {});

          this.token = {
            key: token.oauth_token,
            secret: token.oauth_token_secret,
          };

          this.authorizing = null;
          resolve(this);
        })
        .catch((error) => {
          this.authorizing = null;
          reject(error);
        });
    });
  };

  buildAuthOption = (url: string, params = {}) => {
    const options = {
      ...params,
      method: 'POST',
      url: this.baseURL + url,
      json: true
    };

    options.form = this.oauth.authorize(options);

    if (this.token) {
      options.headers = this.oauth.toHeader(
        this.oauth.authorize(options, this.token)
      );
    }
    return options;
  };

  request = (url, params = {}, version = '1') => {
    return this.authorize()
      .then(() => this.buildAuthOption(version + url, { data: params }))
      .then((options) => request(options));
  };

  verifyCredentials = () => this.request('/account/verify_credentials');

  list = (params = {}) => this.request('/bookmarks/list', params);

  updateReadProgress = (params = {}) => this.request('/bookmarks/update_read_progress', params);

  add = (params = {}) => this.request('/bookmarks/add', params);

  delete = (bookmarkId) => this.request('/bookmarks/delete', {bookmark_id: bookmarkId});

  star = (bookmarkId) => this.request('/bookmarks/star', {bookmark_id: bookmarkId});

  unstar = (bookmarkId) => this.request('/bookmarks/unstar', {bookmark_id: bookmarkId});

  archive = (bookmarkId) => this.request('/bookmarks/archive', {bookmark_id: bookmarkId});

  unArchive = (bookmarkId) => this.request('/bookmarks/unArchive', {bookmark_id: bookmarkId});

  getText = (bookmarkId) => this.request('/bookmarks/get_text', {bookmark_id: bookmarkId});

  move = (bookmarkId, folderId) => this.request('/bookmarks/move', {bookmark_id: bookmarkId, folder_id: folderId});

  listFolders = (params = {}) => this.request('/folders/list');

  addFolder = (title) => this.request('/folders/add', {title});

  deleteFolder = (folderId) => this.request('/folders/delete', {folder_id: folderId});

  listHighlights = (bookmarkId) => this.request(`/bookmarks/${bookmarkId}/highlights`, {}, '1.1')

  /**
   * Create a new highlight for <bookmark-id>
   * @param {*} bookmarkId 
   * @param {*} params 
   * text: The text for the highlight
   * position: Optional. The 0-indexed position of text in the content. Defaults to 0.
   * @returns
   */
  addHighlight = (bookmarkId, params = {}) => this.request(`/bookmarks/${bookmarkId}/highlight`, params, '1.1')

  deleteHighlight = (highlightId) => this.request(`/highlights/${highlightId}/delete`, {}, '1.1')
};

