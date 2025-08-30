"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Import auth components
import AuthHeader from "./AuthHeader";
import SocialLoginButtons from "./SocialLoginButtons";
import AuthDivider from "./AuthDivider";
import AuthLink from "./AuthLink";
import FormField from "./FormField";
import CheckboxField from "./CheckboxField";

export default function SignInForm() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    rememberMe: Yup.boolean()
  });

  // Initial values
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false
  };

  // Submit handler
  const handleSubmit = (values: typeof initialValues) => {
    console.log('SignIn Form Data:', values);
    // Handle sign in logic here
  };
  
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <AuthHeader 
        title={t('signIn')} 
        description={t('signInDescription')} 
      />
      
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <SocialLoginButtons type="signIn" />
          
          <AuthDivider />
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <div className="space-y-4">
                  {/* Email Field */}
                  <FormField 
                    name="email" 
                    type="email" 
                  />
                  
                  {/* Password Field */}
                  <FormField 
                    name="password" 
                    variant="password"
                  />
                  
                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <CheckboxField 
                      name="rememberMe" 
                      variant="rememberMe"
                    />
                    <Link
                      href="/reset-password"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>
                  
                  {/* Submit Button */}
                  <div>
                    <Button type="submit" className="w-full" size="sm">
                      {t('signIn')}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <AuthLink type="signIn" />
        </div>
      </div>
    </div>
  );
}