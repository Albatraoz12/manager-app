'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

export default function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('http://localhost:8080/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from server:', data);

      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  return (
    <section className='md:w-[600px] border md:min-h-[550px] md:max-h-[600px] bg-gray-700 text-white my-10 p-4 mx-auto py-10 flex flex-col'>
      <h1 className='text-4xl my-4'>Sign in</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 flex flex-col'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='task@manager.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='*******************'
                    {...field}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='bg-black text-white hover:cursor-pointer'
          >
            Submit
          </Button>
        </form>
        <p className='text-center'>
          Do you need to create an account?{' '}
          <Link href={'/auth/signup'}>Sign up here</Link>
        </p>
      </Form>
    </section>
  );
}
