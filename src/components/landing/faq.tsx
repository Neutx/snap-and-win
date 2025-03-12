"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand";
  const couponValue = process.env.NEXT_PUBLIC_COUPON_VALUE || "₹200";
  const instagramHandle = process.env.NEXT_PUBLIC_BRAND_INSTAGRAM || "yourbrand";

  const faqs = [
    {
      question: "How do I participate in this promotion?",
      answer: `Purchase any product from ${brandName}, post a photo on Instagram tagging @${instagramHandle}, and submit the post details through our form.`,
    },
    {
      question: "What discount will I receive?",
      answer: `You will receive a ${couponValue} discount coupon that can be used on your next purchase.`,
    },
    {
      question: "How long does it take to receive my coupon?",
      answer: "After submission, our team will verify your post within 48 hours. Once approved, you'll receive your coupon code via email immediately.",
    },
    {
      question: "Can I use multiple coupons together?",
      answer: "No, only one coupon can be used per order. Coupons cannot be combined with other offers.",
    },
    {
      question: "What if my post is rejected?",
      answer: "We'll email you with the reason for rejection. Common reasons include: post not visible, missing brand tag, or post not showing our product.",
    },
    {
      question: "How long is the coupon valid?",
      answer: "The coupon is valid for 90 days from the date it's issued.",
    },
    {
      question: "Can I delete my Instagram post after getting the coupon?",
      answer: "We request that you keep your post up for at least 30 days after receiving your coupon as a part of our promotion terms.",
    },
  ];

  return (
    <section className="py-12 bg-muted/30" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions about our Instagram promotion? Find answers to the most common questions below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
} 