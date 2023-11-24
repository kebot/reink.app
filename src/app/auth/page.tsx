'use client'

import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

import { COOKIE_NAME_OMNIVORE_API_KEY } from './const'

type Inputs = { apiKey: string }

const Connect = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME_OMNIVORE_API_KEY)

    if (cookie) {
      router.push('/')
    }
  }, [router])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setCookie(COOKIE_NAME_OMNIVORE_API_KEY, data.apiKey, {
      // default is 1 year
      maxAge: 365 * 24 * 60 * 60 // seconds
    })

    router.push('/')
  }

  return (
    <div className='container mx-auto font-serif'>
      <div className='navbar bg-base-100'>
        <Link className='btn btn-ghost normal-case text-4xl' href='/'>
          ᚱᛖᛁᚾᚲ
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='max-w-sm mx-auto'>
          <p>
            Connect with your <i>Omnivore</i> account https://omnivore.app/settings/api
          </p>

          <div className='form-control mt-4'>
            <label className='label'>
              <span className='label-text'>API-KEY</span>
            </label>
            <input
              type='string'
              placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
              className='input input-bordered'
              {...register('apiKey', {
                required: true,
                pattern: {
                  value:
                    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i,
                  message: 'Please enter the correct api key',
                },
              })}
            />
          </div>

          {errors.apiKey?.message && <div className='mt-4 text-error underline'>⚠️ {errors.apiKey.message}</div>}

          <div className='form-control mt-2'>
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Connect
