'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <motion.div
                        className="absolute -inset-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 opacity-20 blur-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        DevOps Mastery Hub
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Loading your progress...
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
