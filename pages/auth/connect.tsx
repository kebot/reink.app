import { trpc } from 'utils/trpc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { setCookie } from 'cookies-next'
import { COOKIE_NAME_INSTAPAPER_TOKEN } from 'utils/auth'

type Inputs = {
  email: string
  password: string
}

const Connect = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const mutation = trpc.useMutation(['auth.connectInstapaper'], {
    onSuccess: (data) => {
      setCookie(COOKIE_NAME_INSTAPAPER_TOKEN, data.token)
      router.push('/')
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await mutation.mutate(data)
  }

  useEffect(() => {
    if (mutation.data) {
      console.log(mutation.data.token)
    }
  }, [mutation.data])

  return (
    <div className='container mx-auto font-serif'>
      <div className='navbar bg-base-100'>
        <Link href='/'>
          <a className='btn btn-ghost normal-case text-4xl'>ᚱᛖᛁᚾᚲ</a>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='max-w-sm mx-auto'>
          <div className='w-8 h-8 inline-block'>
            <Image
              alt='Instapaper'
              src='https://staticinstapaper.s3.dualstack.us-west-2.amazonaws.com/img/insta_logo_large.png?v=9d02eda3a38e6b5bc33b5b657c20e364'
              width={512}
              height={512}
            />
          </div>
          <p>
            Connect with your <i>Instapaper</i> account
          </p>

          <div className='form-control mt-4'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='user@reink.app'
              className='input input-bordered'
              {...register('email', { required: true })}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='password'
              className='input input-bordered'
              {...register('password', { required: true })}
            />
          </div>

          {mutation.isError && <div className='mt-4 text-error underline'>{mutation.error.message}</div>}

          <div className='form-control mt-2'>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Connect
