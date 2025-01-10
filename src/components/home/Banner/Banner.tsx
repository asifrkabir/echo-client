"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Banner.module.css";
import { useUser } from "@/context/user.provider";

const Banner = () => {
  const { user } = useUser();

  return (
    <div className={styles.banner_container}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-default">
        <motion.h1
          className="text-4xl font-bold text-black text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Pawfect!
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-black text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your go-to platform for pet care tips, stories, and nutrition needs.
        </motion.p>

        {user && user?.role === "admin" ? (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/admin-dashboard"
              className="px-4 py-2 text-black bg-[#FCBE4F] rounded hover:bg-[#e6a93c] transition"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/user-dashboard/news-feed"
              className="px-4 py-2 text-black bg-[#FCBE4F] rounded hover:bg-[#e6a93c] transition"
            >
              Go to Newsfeed
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Banner;
