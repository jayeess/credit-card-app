import Link from 'next/link';
import { CreditCard, ArrowRight, Shield, Zap, Award } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float stagger-2" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse-soft" />
      </div>

      <div className="max-w-lg w-full text-center relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in-up border border-white/20">
          {/* Animated icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-float">
            <CreditCard className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold mb-3 animate-fade-in-up stagger-1">
            <span className="gradient-text">Credit Card</span>
            <br />
            <span className="text-gray-900">Application</span>
          </h1>

          <p className="text-gray-600 mb-8 text-lg animate-fade-in-up stagger-2">
            Apply for your new credit card in minutes. Fast, secure, and easy.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up stagger-3">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Quick Approval
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              100% Secure
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              <Award className="w-4 h-4" />
              Best Rates
            </div>
          </div>

          <Link
            href="/apply"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 btn-shine animate-fade-in-up stagger-4"
          >
            Start Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="mt-6 text-sm text-gray-500 animate-fade-in stagger-5">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        <p className="mt-8 text-sm text-gray-500 animate-fade-in stagger-5">
          &copy; {new Date().getFullYear()} Credit Card Services. All rights reserved.
        </p>
      </div>
    </main>
  );
}
