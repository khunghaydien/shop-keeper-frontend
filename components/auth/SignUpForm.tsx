"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import React from "react";
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

export default function SignUpForm() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  // Initial values
  const initialValues = {
    email: '',
    name: '',
    password: '',
    acceptTerms: false
  };

  // Submit handler
  const handleSubmit = (values: typeof initialValues) => {
    console.log('SignUp Form Data:', values);
    // Handle sign up logic here
  };
  
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <AuthHeader 
        title={t('signUp')} 
        description={t('signUpDescription')} 
      />
      
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <SocialLoginButtons type="signUp" />
          
          <AuthDivider />
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="space-y-4">
                  {/* Email */}
                  <FormField 
                    name="email" 
                    type="email" 
                  />

                  {/* Name */}
                  <FormField 
                    name="name" 
                    type="text" 
                  />

                  {/* Password */}
                  <FormField 
                    name="password" 
                    variant="password"
                  />
                  
                  {/* Terms Checkbox */}
                  <CheckboxField 
                    name="acceptTerms" 
                    variant="terms"
                  />
                  
                  {/* Submit Button */}
                  <div>
                    <button 
                      type="submit"
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    >
                      {t('signUp')}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <AuthLink type="signUp" />
        </div>
      </div>
    </div>
  );
}