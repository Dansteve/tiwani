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
  interests: string[];
  confirm: boolean;
}

import { submitToWaitlist } from "../lib/waitlist";

export default function Waitlist() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<WaitlistFormValues>({
    defaultValues: {
      interests: [],
      confirm: false
    }
  });

  const selectedInterests = watch("interests");
  const isConfirmed = watch("confirm");

  const toggleInterest = (interest: string) => {
    const current = selectedInterests || [];
    if (current.includes(interest)) {
      setValue("interests", current.filter(i => i !== interest));
    } else {
      setValue("interests", [...current, interest]);
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
              I'm a SEND parent exploring an early-stage, non-clinical digital idea focused on helping families shape more predictability into everyday life. This form helps me understand interest and identify parents who may wish to engage as the idea develops.
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
                Which of the following best describes your interest? <span className="text-sm font-normal text-slate-400">(Select all that apply)</span>
              </Label>
              
              <div className="grid gap-4">
                {[
                  "I would be interested in early access to a tool like this",
                  "I would be open to using this if it becomes available",
                  "I would be happy to share feedback as it develops",
                  "I would be open to being contacted for further input"
                ].map((interest) => {
                  const isChecked = (selectedInterests || []).includes(interest);
                  return (
                    <div 
                      key={interest}
                      onClick={() => toggleInterest(interest)}
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
                        {interest}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-start space-x-4">
              <Checkbox 
                id="confirm" 
                checked={isConfirmed}
                onCheckedChange={(checked) => setValue("confirm", !!checked)}
                className="mt-1 border-2 data-[state=checked]:bg-[#D85A30] data-[state=checked]:border-[#D85A30]"
              />
              <div className="space-y-1">
                <label htmlFor="confirm" className="text-base font-medium cursor-pointer leading-tight select-none" style={{ color: '#04342C' }}>
                  Please confirm the following: <span className="text-red-500">*</span>
                </label>
                <p className="text-sm" style={{ color: '#5F5E5A' }}>
                  I am expressing interest in engaging with this early-stage idea as it develops
                </p>
              </div>
            </div>
            {errors.confirm && <p className="text-sm text-red-500">This confirmation is required.</p>}

            <Button
              type="submit"
              disabled={isLoading || !isConfirmed}
              className="w-full h-20 rounded-[30px] text-xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all"
              style={{ 
                backgroundColor: isConfirmed ? '#D85A30' : '#E5E7EB', 
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
