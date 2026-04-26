import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Send, CheckCircle2, CheckIcon } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

interface WaitlistFormValues {
  email: string;
  roles: string[];
}

import { submitToWaitlist } from "../lib/waitlist";

export default function Waitlist() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<WaitlistFormValues>({
    defaultValues: {
      roles: [],
    }
  });

  const selectedRoles = watch("roles");

  const toggleRole = (role: string) => {
    const current = selectedRoles || [];
    if (current.includes(role)) {
      setValue("roles", current.filter(r => r !== role));
    } else {
      setValue("roles", [...current, role]);
    }
  };

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsLoading(true);
    
    try {
      await submitToWaitlist(data);
      setIsSubmitted(true);
      toast.success("Thank you for joining our waitlist!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#F1EFE8' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-12 rounded-[40px] text-center space-y-8 bg-white shadow-2xl"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(29, 158, 117, 0.1)' }}>
              <CheckCircle2 size={40} style={{ color: '#1D9E75' }} />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold" style={{ color: '#04342C' }}>You're on the list!</h2>
            <p style={{ color: '#5F5E5A' }}>
              We've received your interest and will keep you updated on our journey toward launching in 2026.
            </p>
          </div>
          <Link to="/" className="inline-block mt-4">
            <Button variant="outline" className="rounded-full px-8 py-6 h-auto text-lg border-2" style={{ color: '#0F6E56', borderColor: '#0F6E56' }}>
              Back to home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6" style={{ backgroundColor: '#F1EFE8' }}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 mb-12 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#0F6E56' }}>
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-[50px] shadow-2xl"
        >
          <div className="space-y-8 mb-12">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full w-fit" style={{ backgroundColor: 'rgba(216, 90, 48, 0.1)', border: '1px solid rgba(216, 90, 48, 0.2)' }}>
              <Sparkles size={16} style={{ color: '#D85A30' }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#D85A30' }}>Early Access</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: '#04342C' }}>
              Join the TIWANI Waitlist
            </h1>
            
            <p className="text-lg leading-relaxed" style={{ color: '#5F5E5A' }}>
              We're building infrastructure for families who carry more than their share. Your place is reserved.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-4">
              <Label htmlFor="email" className="text-lg font-semibold" style={{ color: '#04342C' }}>
                Email address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-16 rounded-2xl border-2 focus-visible:ring-[#1D9E75] text-lg px-6"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message || "Please enter a valid email address."}</p>}
            </div>

            <div className="space-y-6">
              <Label className="text-lg font-semibold block" style={{ color: '#04342C' }}>
                Who are you coordinating care for? <span className="text-red-500">*</span> <span className="text-sm font-normal text-slate-400 block mt-1">(Select all that apply)</span>
              </Label>
              
              <div className="grid gap-4">
                {[
                  "A child or young person with additional needs",
                  "An older adult",
                  "Someone with a long-term condition",
                  "I work with caregiving families professionally"
                ].map((role) => {
                  const isChecked = (selectedRoles || []).includes(role);
                  return (
                    <div 
                      key={role}
                      onClick={() => toggleRole(role)}
                      className="flex items-start space-x-4 p-5 rounded-2xl border-2 transition-all cursor-pointer hover:bg-slate-50 select-none group"
                      style={{ 
                        borderColor: isChecked ? '#1D9E75' : 'rgba(0,0,0,0.05)',
                        backgroundColor: isChecked ? 'rgba(29, 158, 117, 0.03)' : '#ffffff'
                      }}
                    >
                      <div 
                        className={`mt-1 size-5 shrink-0 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                          isChecked ? "bg-[#1D9E75] border-[#1D9E75]" : "bg-white border-slate-200 group-hover:border-slate-300"
                        }`}
                      >
                        {isChecked && <CheckIcon className="size-3.5 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-base leading-tight" style={{ color: '#5F5E5A' }}>
                        {role}
                      </span>
                    </div>
                  );
                })}
              </div>
              {(selectedRoles || []).length === 0 && <p className="text-sm text-amber-600 mt-2">Please select at least one option.</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading || (selectedRoles || []).length === 0}
              className="w-full h-20 rounded-[30px] text-xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all"
              style={{ 
                backgroundColor: (selectedRoles || []).length > 0 ? '#D85A30' : '#E5E7EB', 
                color: '#ffffff'
              }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Send size={24} />
                </motion.div>
              ) : (
                <>
                  Submit Interest
                  <ArrowLeft size={24} className="rotate-180" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
