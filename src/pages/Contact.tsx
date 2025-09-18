import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import FloatingElements from '@/components/FloatingElements';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { trackPageView, trackContact } from '@/lib/analytics';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';
import StudyTools from '@/components/StudyTools';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form state - keeping it simple! 📝
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Track page view when component mounts - analytics are cool! 📊
  useEffect(() => {
    trackPageView('/contact');
  }, []);

  // Handle form submission - the magic happens here! ✨
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_CONFIG.publicKey);

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        'template_ephwkbw', // Your EmailJS template ID
        {
          to_email: 'algoflowteam@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );
      
      console.log('Email sent successfully:', result);

      // Track contact form submission
      try {
        await trackContact(formData);
      } catch (error) {
        console.log('Contact tracking failed:', error);
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon!",
      });

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Failed to send email:', error);
      console.error('Error details:', {
        serviceId: EMAILJS_CONFIG.serviceId,
        publicKey: EMAILJS_CONFIG.publicKey,
        error: error
      });
      toast({
        title: "Error",
        description: `Failed to send message: ${error.message || 'Unknown error'}. Please try again or contact us directly.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      content: 'San Jose, CA',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative section-padding pt-32">
        <div className="container-width relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-primary/10 rounded-full text-primary font-medium text-sm mb-8 animate-slide-up">
              <span className="text-sm">💬</span>
              <span>Get in Touch</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight animate-slide-up">
              Let's <span className="bg-gradient-primary bg-clip-text text-transparent">Connect</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto animate-slide-up">
              Have questions about our algorithm learning platform? We'd love to hear from you! 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass-panel border-0 shadow-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="btn-primary w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  We're here to help you master algorithms through visual learning. 
                  Reach out to us through any of these channels.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="glass-panel p-6 rounded-2xl hover-lift group block transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                        <p className="text-slate-300 group-hover:text-primary transition-colors">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Office Hours */}
              <Card className="gradient-card border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Office Hours</h3>
                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-slate-50/5 to-blue-50/5">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-panel border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Is the platform free to use?</h3>
                <p className="text-slate-300">
                  Yes! Our core algorithm learning content is completely free. We believe in making quality education accessible to everyone.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">What age group is this for?</h3>
                <p className="text-slate-300">
                  Our platform is designed for High School and Early College students, but anyone interested in learning algorithms can benefit from it.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Do you offer support for teachers?</h3>
                <p className="text-slate-300">
                  Coming soon! We're working on special resources and support for educators who want to use our platform in their classrooms.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Can I request new algorithms?</h3>
                <p className="text-slate-300">
                  Yes! We're always looking to expand our content. Feel free to suggest algorithms you'd like to see covered.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
