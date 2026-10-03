"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site-data";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", service: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const text = encodeURIComponent(
      `Hi Thakur Electricals, I'm ${values.name}.\nService needed: ${values.service}\nMessage: ${values.message}\nContact me on: ${values.phone}`
    );
    toast.success("Thanks! Opening WhatsApp to confirm your request.");
    setSubmitted(true);
    form.reset();
    window.open(`${siteConfig.social.whatsapp}?text=${text}`, "_blank");
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-border/70 bg-card p-10 text-center"
      >
        <CheckCircle2 className="size-12 text-brand" />
        <p className="font-heading text-xl font-semibold">Request sent!</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          We&apos;ll get back to you shortly. For urgent work, just call us
          directly.
        </p>
        <Button
          variant="outline"
          className="mt-2 rounded-full"
          onClick={() => setSubmitted(false)}
        >
          Send another request
        </Button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="numeric"
                  placeholder="98765 43210"
                  autoComplete="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service needed</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about the job</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. My geyser has stopped heating water, need a repair visit this week."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-11 w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Send Request
        </Button>
      </form>
    </Form>
  );
}
