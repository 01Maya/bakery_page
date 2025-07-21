"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon, MapPin, Phone, Mail, Clock, HandHeart, Leaf, BookText } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Define the sections for navigation
const sections = [
  { id: "home", name: "Home" },
  { id: "menu", name: "Menu" },
  { id: "about-us", name: "About Us" },
  { id: "why-us", name: "Why Us" },
  { id: "contact", name: "Contact" },
]

// Reusable animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const zoomInVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// Component for scroll-triggered animation
const AnimatedSection = ({
  children,
  id,
  className,
}: { children: React.ReactNode; id: string; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 }) // Trigger when 30% of the section is visible

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function BakeryLandingPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-bakeryBeige-200 text-bakeryBrown-900">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bakeryBeige-200/90 backdrop-blur-sm shadow-sm px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link
          href="#"
          className="flex items-center gap-2 font-serif text-2xl font-bold"
          onClick={() => scrollToSection("home")}
        >
          BAKERY
        </Link>
        <nav className="hidden md:flex gap-6">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="text-lg font-medium hover:text-bakeryGold-500 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(section.id)
              }}
            >
              {section.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-bakeryBeige-100">
              <div className="flex flex-col gap-6 py-6">
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-xl font-medium hover:text-bakeryGold-500 transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section.id)
                      setIsSheetOpen(false) // Close the sheet after clicking a link
                    }}
                  >
                    {section.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {" "}
        {/* Add padding-top to account for fixed header */}
        {/* Hero Section */}
        <AnimatedSection id="home" className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
          <Image
            src="/images/chocolate-croissant.jpg"
            alt="Freshly baked croissants and coffee"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
          />
          <div className="absolute inset-0 bg-bakeryBeige-200/80 flex flex-col items-center justify-center text-center p-4">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-bakeryBrown-900 drop-shadow-lg"
            >
              Freshly Baked, Just for You!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="mt-4 text-lg md:text-xl max-w-2xl text-bakeryBrown-800"
            >
              Indulge in our exquisite selection of artisanal breads, delightful pastries, and custom cakes, crafted
              with passion and the finest ingredients.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-8"
            >
              <Button
                className="px-8 py-4 text-lg bg-bakeryBrown-900 text-bakeryBeige-100 hover:bg-bakeryGold-500 hover:text-bakeryBrown-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => scrollToSection("menu")}
              >
                Order Now
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>
        {/* Menu Section */}
        <AnimatedSection id="menu" className="py-16 md:py-24 bg-bakeryBeige-100">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-12">Our Delicious Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src="/images/croissants-au-beurre.jpg"
                  alt="Artisanal Breads"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-serif mb-2">Artisanal Breads</h3>
                  <p className="text-bakeryBrown-800 mb-4">
                    Sourdough, Rye, Baguettes, and more. Baked fresh daily with natural starters.
                  </p>
                  <Button className="bg-bakeryBrown-900 text-bakeryBeige-100 hover:bg-bakeryGold-500 hover:text-bakeryBrown-900 transition-all duration-300">
                    View Breads
                  </Button>
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src="/images/easy-croissant-recipes-for-breakfast-brunch-and-dessert.jpg"
                  alt="Sweet Pastries"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-serif mb-2">Sweet Pastries</h3>
                  <p className="text-bakeryBrown-800 mb-4">
                    Croissants, Danishes, Muffins, and more. Perfect for your morning coffee.
                  </p>
                  <Button className="bg-bakeryBrown-900 text-bakeryBeige-100 hover:bg-bakeryGold-500 hover:text-bakeryBrown-900 transition-all duration-300">
                    View Pastries
                  </Button>
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src="/images/deliciously-simple-vanilla-cake-recipe.jpg"
                  alt="Custom Cakes"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-serif mb-2">Custom Cakes</h3>
                  <p className="text-bakeryBrown-800 mb-4">
                    Celebrate with our bespoke cakes for any occasion. Designed just for you.
                  </p>
                  <Button className="bg-bakeryBrown-900 text-bakeryBeige-100 hover:bg-bakeryGold-500 hover:text-bakeryBrown-900 transition-all duration-300">
                    Order Cake
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
        {/* About Us Section */}
        <AnimatedSection id="about-us" className="py-16 md:py-24 bg-bakeryBeige-200">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={zoomInVariants}>
              <Image
                src="/images/petite-perfection-mini-cupcake-masterpieces.jpg"
                alt="Bakery interior"
                width={700}
                height={500}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">Our Story</h2>
              <p className="text-lg text-bakeryBrown-800 leading-relaxed">
                Welcome to Bakery, where passion meets perfection in every bite. Founded in 2005, our journey began with
                a simple dream: to share the joy of authentic, handcrafted baked goods with our community. We believe in
                the power of traditional recipes, the freshest ingredients, and the warmth of a truly homemade touch.
              </p>
              <p className="mt-4 text-lg text-bakeryBrown-800 leading-relaxed">
                From our signature sourdoughs to our delicate pastries and custom-designed cakes, every item is a
                testament to our dedication to quality and flavor. We invite you to experience the difference that true
                craftsmanship makes.
              </p>
            </div>
          </div>
        </AnimatedSection>
        {/* Why Choose Us Section */}
        <AnimatedSection id="why-us" className="py-16 md:py-24 bg-bakeryBeige-100">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}>
                <Card className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col items-center text-center">
                  <span className="text-bakeryGold-500 mb-4">
                    <HandHeart className="h-12 w-12" />
                  </span>
                  <CardTitle className="text-2xl font-serif mb-2">Handmade Goods</CardTitle>
                  <CardContent className="text-bakeryBrown-800">
                    Every item is lovingly crafted by hand, ensuring unique quality and taste.
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}>
                <Card className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col items-center text-center">
                  <span className="text-bakeryGold-500 mb-4">
                    <Leaf className="h-12 w-12" />
                  </span>
                  <CardTitle className="text-2xl font-serif mb-2">Fresh Ingredients</CardTitle>
                  <CardContent className="text-bakeryBrown-800">
                    We source the finest, freshest ingredients to guarantee superior flavor.
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}>
                <Card className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col items-center text-center">
                  <span className="text-bakeryGold-500 mb-4">
                    <BookText className="h-12 w-12" />
                  </span>
                  <CardTitle className="text-2xl font-serif mb-2">Traditional Recipes</CardTitle>
                  <CardContent className="text-bakeryBrown-800">
                    Our recipes are passed down through generations, preserving authentic taste.
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
        {/* Contact/Visit Us Section */}
        <AnimatedSection id="contact" className="py-16 md:py-24 bg-bakeryBeige-200">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-12">Visit Us Today!</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-left">
                <div className="flex items-start gap-4">
                  <MapPin className="h-8 w-8 text-bakeryGold-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold font-serif">Our Address</h3>
                    <p className="text-lg text-bakeryBrown-800">123 Bakery Lane, Sweet Town, CA 90210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-8 w-8 text-bakeryGold-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold font-serif">Call Us</h3>
                    <p className="text-lg text-bakeryBrown-800">(123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-8 w-8 text-bakeryGold-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold font-serif">Email Us</h3>
                    <p className="text-lg text-bakeryBrown-800">info@bakerybrand.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-8 w-8 text-bakeryGold-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold font-serif">Opening Hours</h3>
                    <p className="text-lg text-bakeryBrown-800">Mon-Sat: 8 AM - 6 PM</p>
                    <p className="text-lg text-bakeryBrown-800">Sunday: 9 AM - 4 PM</p>
                  </div>
                </div>
                <motion.div
                  variants={zoomInVariants}
                  className="w-full h-64 bg-bakeryBeige-300 rounded-lg shadow-md flex items-center justify-center text-bakeryBrown-700 text-xl"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0190000000003!2d-122.4194159!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858086a9d6d7d7%3A0x123456789abcdef0!2sBakery%20Cafe!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: "0.5rem" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bakery Location Map"
                  ></iframe>
                </motion.div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                >
                  <Image
                    src="/images/these-strawberries-cream-pastry-puffs-are-light-airy-and-simply-divine.jpg"
                    alt="Bakery counter"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md w-full h-auto object-cover"
                  />
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                >
                  <Image
                    src="/images/croissants-au-beurre.jpg"
                    alt="Fresh bread display"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md w-full h-auto object-cover"
                  />
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                >
                  <Image
                    src="/images/download (1).jpg"
                    alt="Waffles with cream and blueberries"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md w-full h-auto object-cover"
                  />
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                >
                  <Image
                    src="/images/download.jpg"
                    alt="Cinnamon roll with icing"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-bakeryBrown-900 text-bakeryBeige-100 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <p>&copy; {new Date().getFullYear()} Bakery. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="#" className="hover:text-bakeryGold-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-bakeryGold-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
