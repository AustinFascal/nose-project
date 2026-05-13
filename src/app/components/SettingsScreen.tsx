import { motion } from 'motion/react';
import { Settings, Shield, Bell, Layout, MousePointer2 } from 'lucide-react';
import { useState } from 'react';

interface SettingsScreenProps {
  floatingEnabled: boolean;
  onToggleFloating: (val: boolean) => void;
  notificationEnabled: boolean;
  onToggleNotification: (val: boolean) => void;
}

export function SettingsScreen({
  floatingEnabled,
  onToggleFloating,
  notificationEnabled,
  onToggleNotification
}: SettingsScreenProps) {
  return (
    <div className="p-6 space-y-8 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold mb-2">Settings</h2>
        <p className="text-muted-foreground">Customize your Nosè protection experience</p>
      </motion.div>

      {/* Panic Button Configuration */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary/60 px-2 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Panic Button Mode
        </h3>
        
        <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border">
          {/* Floating Overlay Toggle */}
          <div className="p-5 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Floating Overlay</h4>
                <p className="text-sm text-muted-foreground">Always-on button over any app</p>
              </div>
            </div>
            <Toggle 
              id="setting-floating"
              enabled={floatingEnabled} 
              onToggle={onToggleFloating} 
            />
          </div>

          {/* Notification Shade Toggle */}
          <div className="p-5 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Notification Action</h4>
                <p className="text-sm text-muted-foreground">Show in system notification area</p>
              </div>
            </div>
            <Toggle 
              id="setting-notification"
              enabled={notificationEnabled} 
              onToggle={onToggleNotification} 
            />
          </div>
        </div>
      </section>

      {/* General Settings */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary/60 px-2 flex items-center gap-2">
          <Layout className="w-4 h-4" />
          General
        </h3>
        <div className="bg-card border border-border rounded-3xl p-5 flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold">Language</h4>
              <p className="text-sm text-muted-foreground">English (American)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Toggle({ enabled, onToggle, id }: { enabled: boolean; onToggle: (val: boolean) => void; id?: string }) {
  return (
    <button
      id={id}
      onClick={() => onToggle(!enabled)}
      className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${
        enabled ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-sm"
      />
    </button>
  );
}
