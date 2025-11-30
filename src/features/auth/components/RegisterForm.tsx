
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


const registerSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] })

type RegisterSchemaType = z.infer<typeof registerSchema>


const RegisterForm = () => {

  const router = useRouter()

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: RegisterSchemaType) => {

    await authClient.signUp.email({
      name: data.email,
      email: data.email,
      password: data.password,
      callbackURL: '/'

    }, {
      onSuccess: () => {

        toast.success('Registered successfully!')
        router.push('/')
      },
      onError: (error) => {

        toast.error(`Registration failed: ${error.error.message}`)
      }
    })}

  const isPending = form.formState.isSubmitting;

  return (
    <Card className={cn("w-full max-w-md mx-auto")}>
      <CardHeader className=''>
        <CardTitle className="text-2xl text-center">Get Started</CardTitle>
        <CardDescription className='text-center'>Create your account to get started.</CardDescription>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
                {isPending ? 'processing...' : 'Register'}
              </Button>
            </CardFooter>
            <div className='text-sm text-center w-full mt-2'>
              Already have an account <a href="/login" className='underline'>Login</a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

  )


}

export default RegisterForm;