
'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardAction,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'


const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof loginSchema>


const LoginForm = () => {

  const router = useRouter()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormData) => {

    await authClient.signIn.email({

      email: data.email,
      password: data.password,

    }, {

      onSuccess: () => {

        toast.success('Login successfully!')
        router.push('/')
      },
      onError: (error) => {

        toast.error(`Login failed: ${error.error.message}`)
      }

    })

  }

  const isPending = form.formState.isSubmitting;

  return (
    <Card className={cn("w-full max-w-md mx-auto")}>
      <CardHeader className=''>
        <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
        <CardDescription className='text-center'>Login to continue back!</CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Button variant="outline" className="w-full">
              <Image src="/logo/google.svg" alt="Google Logo" width={20} height={20} className="mr-2 inline-block" />
              Continue with Google
            </Button>
            <Button variant="outline" className='w-full'>
             <Image src="/logo/github.svg" alt="Google Logo" width={20} height={20} className="mr-2 inline-block" />
              Continue with GitHub
            </Button>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder=""
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className='w-full p-0'>

              <Button
                type="submit"
                className={cn(
                  "w-full px-4 py-2 font-semibold text-white  rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2",
                  isPending && "opacity-50 cursor-not-allowed"
                )}
                disabled={isPending}
              >
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
            <div className='text-sm text-center w-full mt-2'>
              Don't have an account? <a href="/signup" className='underline'>Register</a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

  )


}

export default LoginForm;