"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

const initialState = {
  errors: {
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
  },
  values: {
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
  },
}

const inputStyles =
  "rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  
const labelStyles =
  "mb-1 text-sm font-medium text-gray-700"

const errorStyles =
  "mt-1 text-sm text-red-500"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          Register
        </h2>

        <form action={formAction} className="space-y-5">
          {/* Username */}
          <div className="flex flex-col">
            <label className={labelStyles}>Username</label>
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
              className={inputStyles}
            />
            {state.errors?.username && (
              <p className={errorStyles}>{state.errors.username}</p>
            )}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label className={labelStyles}>Name</label>
            <input
              type="text"
              name="name"
              defaultValue={state.values?.name}
              className={inputStyles}
            />
            {state.errors?.name && (
              <p className={errorStyles}>{state.errors.name}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className={labelStyles}>Password</label>
            <input
              type="password"
              name="password"
              defaultValue={state.values?.password}
              className={inputStyles}
            />
            {state.errors?.password && (
              <p className={errorStyles}>{state.errors.password}</p>
            )}
          </div>

          {/* Password Confirm */}
          <div className="flex flex-col">
            <label className={labelStyles}>
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              defaultValue={state.values?.passwordConfirm}
              className={inputStyles}
            />
            {state.errors?.passwordConfirm && (
              <p className={errorStyles}>
                {state.errors.passwordConfirm}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}