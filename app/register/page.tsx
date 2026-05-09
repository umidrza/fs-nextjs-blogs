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
  "mt-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

const labelStyles =
  "flex flex-col text-sm font-medium text-slate-700"

const errorStyles =
  "mt-1 text-sm text-rose-600"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/60">
        <h2 className="mb-6 text-3xl font-bold text-slate-950">
          Register
        </h2>

        <form action={formAction} className="space-y-5">
          {/* Username */}
          <label className={labelStyles}>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
              className={inputStyles}
            />
            {state.errors?.username && (
              <p className={errorStyles} data-testid="username-error">{state.errors.username}</p>
            )}
          </label>

          {/* Name */}
          <label className={labelStyles}>
            Name
            <input
              type="text"
              name="name"
              defaultValue={state.values?.name}
              className={inputStyles}
            />
            {state.errors?.name && (
              <p className={errorStyles} data-testid="name-error">{state.errors.name}</p>
            )}
          </label>

          {/* Password */}
          <label className={labelStyles}>
            Password
            <input
              type="password"
              name="password"
              defaultValue={state.values?.password}
              className={inputStyles}
            />
            {state.errors?.password && (
              <p className={errorStyles} data-testid="password-error">{state.errors.password}</p>
            )}
          </label>

          {/* Password Confirm */}
          <label className={labelStyles}>
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              defaultValue={state.values?.passwordConfirm}
              className={inputStyles}
            />
            {state.errors?.passwordConfirm && (
              <p className={errorStyles} data-testid="passwordConfirm-error">
                {state.errors.passwordConfirm}
              </p>
            )}
          </label>

          <button
            type="submit"
            data-testid="register-button"
            className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}