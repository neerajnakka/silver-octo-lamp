'use client';

import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Bell, Lock, User, Trash2, Eye, Type, Contrast } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';

export default function SettingsPage() {
  const { 
    theme, 
    setTheme, 
    fontSize, 
    setFontSize,
    bionicReading,
    setBionicReading,
    highContrast,
    setHighContrast,
    dyslexiaFont,
    setDyslexiaFont
  } = useStore();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  const fontSizes = [
    { value: '14px', label: 'Small' },
    { value: '16px', label: 'Medium' },
    { value: '18px', label: 'Large' },
    { value: '20px', label: 'Extra Large' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <SettingsIcon className="h-12 w-12 mb-4" />
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-white/90">Manage your preferences and account settings</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the platform looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        theme === value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{label}</span>
                      {theme === value && (
                        <Badge variant="primary" size="sm">
                          Active
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">
                  <Type className="inline h-4 w-4 mr-2" />
                  Font Size
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {fontSizes.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setFontSize(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        fontSize === value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600'
                      }`}
                    >
                      <span style={{ fontSize: value }} className="font-medium">A</span>
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Accessibility
              </CardTitle>
              <CardDescription>Features to enhance readability and learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingToggle
                label="Bionic Reading"
                description="Bold the first half of words to enhance reading speed and focus"
                checked={bionicReading}
                onChange={setBionicReading}
              />
              <SettingToggle
                label="High Contrast Mode"
                description="Increase contrast for better visibility"
                checked={highContrast}
                onChange={setHighContrast}
              />
              <SettingToggle
                label="Dyslexia-Friendly Font"
                description="Use OpenDyslexic font designed for easier reading"
                checked={dyslexiaFont}
                onChange={setDyslexiaFont}
              />
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Tip:</strong> These accessibility features can be combined for the best reading experience. 
                  Experiment with different combinations to find what works best for you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingToggle
                label="Achievement notifications"
                description="Get notified when you earn a new achievement"
                defaultChecked={true}
              />
              <SettingToggle
                label="Streak reminders"
                description="Daily reminder to maintain your learning streak"
                defaultChecked={true}
              />
              <SettingToggle
                label="New content alerts"
                description="Get notified when new lessons are added"
                defaultChecked={false}
              />
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account
              </CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full sm:w-auto">
                  Export Data
                </Button>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Download all your learning data and progress
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-rose-200 dark:border-rose-900">
            <CardHeader>
              <CardTitle className="text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/20">
                  Reset All Progress
                </Button>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  This will delete all your learning progress and cannot be undone
                </p>
              </div>
              <div>
                <Button variant="danger">
                  Delete Account
                </Button>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Permanently delete your account and all associated data
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ label, description, checked, onChange, defaultChecked }) {
  const isControlled = checked !== undefined && onChange !== undefined;
  
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={isControlled ? (e) => onChange(e.target.checked) : undefined}
          className="sr-only peer" 
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
      </label>
    </div>
  );
}
