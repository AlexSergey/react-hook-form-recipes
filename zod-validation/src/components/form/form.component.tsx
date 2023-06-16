import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const validationSchema = z
  .object({
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    firstName: z.string().min(1, { message: 'Firstname is required' }),
    lastName: z.string().min(1, { message: 'Lastname is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  });

type ValidationSchema = z.infer<typeof validationSchema>;

export const Form = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
            First Name
          </label>
          <input
            className={classNames({
              'appearance-none': true,
              border: true,
              'border-red-500': errors.firstName,
              'focus:outline-none': true,
              'focus:shadow-outline': true,
              'leading-tight': true,
              'px-3': true,
              'py-2': true,
              rounded: true,
              'text-gray-700': true,
              'text-sm': true,
              'w-full': true,
            })}
            id="firstName"
            type="text"
            placeholder="First Name"
            {...register('firstName')}
          />
          {errors.firstName && <p className="text-xs italic text-red-500 mt-2"> {errors.firstName?.message}</p>}
        </div>
        <div className="md:ml-2">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
            Last Name
          </label>
          <input
            className={classNames({
              'appearance-none': true,
              border: true,
              'border-red-500': errors.lastName,
              'focus:outline-none': true,
              'focus:shadow-outline': true,
              'leading-tight': true,
              'px-3': true,
              'py-2': true,
              rounded: true,
              'text-gray-700': true,
              'text-sm': true,
              'w-full': true,
            })}
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register('lastName')}
          />
          {errors.lastName && <p className="text-xs italic text-red-500 mt-2"> {errors.lastName?.message}</p>}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className={classNames({
            'appearance-none': true,
            border: true,
            'border-red-500': errors.email,
            'focus:outline-none': true,
            'focus:shadow-outline': true,
            'leading-tight': true,
            'px-3': true,
            'py-2': true,
            rounded: true,
            'text-gray-700': true,
            'text-sm': true,
            'w-full': true,
          })}
          id="email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <p className="text-xs italic text-red-500 mt-2"> {errors.email?.message}</p>}
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className={classNames({
              'appearance-none': true,
              border: true,
              'border-red-500': errors.password,
              'focus:outline-none': true,
              'focus:shadow-outline': true,
              'leading-tight': true,
              'px-3': true,
              'py-2': true,
              rounded: true,
              'text-gray-700': true,
              'text-sm': true,
              'w-full': true,
            })}
            id="password"
            type="password"
            {...register('password')}
          />
          {errors.password && <p className="text-xs italic text-red-500 mt-2"> {errors.password?.message}</p>}
        </div>
        <div className="md:ml-2">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
            Confirm Password
          </label>
          <input
            className={classNames({
              'appearance-none': true,
              border: true,
              'border-red-500': errors.confirmPassword,
              'focus:outline-none': true,
              'focus:shadow-outline': true,
              'leading-tight': true,
              'px-3': true,
              'py-2': true,
              rounded: true,
              'text-gray-700': true,
              'text-sm': true,
              'w-full': true,
            })}
            id="c_password"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-xs italic text-red-500 mt-2"> {errors.confirmPassword?.message}</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <input type="checkbox" id="terms" {...register('terms')} />
        <label
          htmlFor="terms"
          className={classNames({
            'font-bold': true,
            'mb-2': true,
            'ml-2': true,
            'text-gray-700': true,
            'text-red-500': errors.terms,
            'text-sm': true,
          })}
        >
          Accept Terms & Conditions
        </label>
        {errors.terms && <p className="text-xs italic text-red-500 mt-2">{errors.terms?.message}</p>}
      </div>
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register Account
        </button>
      </div>
      <hr className="mb-6 border-t" />
      <div className="text-center">
        <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
      <div className="text-center">
        <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
          Already have an account? Login!
        </a>
      </div>
    </form>
  );
};
