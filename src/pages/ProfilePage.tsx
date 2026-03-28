import { Settings, ChevronRight, ShieldCheck, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react";
import TopBar from "../components/TopBar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-surface pb-32">
      <TopBar title="Profile" />
      
      <main className="px-6 pt-8 max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-10">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-container shadow-lg">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuTRb4D1-O_u9jwzpfzQyZ7bNvwHci1DLxKNfwz4dowdXdCP_PwC20RqihkSA2EdwJwdPCwYDDhSA6U5BuMVXn5bDRQQoxwWVPrbkjRtVsxxYDpJqujWnczWEUuUIs1WQWci-eMbKpZVE-VNFsX8Qq5c8iWNyyCQVdhvajFqm50R-17balgRq9Z_-hA5hNiWOljCQYmilh3cR1qeBXMAFMDc0WaTDKffTG3aF0MZtP_6sARezANbBoDbjSt55IglezX0a-SqMky3KH" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-extrabold text-on-background tracking-tight">Alex Tran</h1>
            <p className="text-on-surface-variant font-medium mb-2">Student at RMIT University</p>
            <button className="text-xs font-bold bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full uppercase tracking-wider">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-container rounded-2xl p-5 mb-8 flex items-center justify-between text-on-primary shadow-lg">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" />
            <div>
              <p className="font-bold text-lg leading-tight">Identity Verified</p>
              <p className="text-xs opacity-90">You stand out to hosts!</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 opacity-70" />
        </div>

        {/* Settings List */}
        <div className="space-y-6">
          <section>
            <h2 className="font-headline text-xl font-bold mb-4 text-on-background">Account Settings</h2>
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30">
              <SettingsRow icon={Settings} title="Personal Information" />
              <div className="h-px bg-outline-variant/20 mx-4" />
              <SettingsRow icon={CreditCard} title="Payments & Payouts" />
              <div className="h-px bg-outline-variant/20 mx-4" />
              <SettingsRow icon={Bell} title="Notifications" />
            </div>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold mb-4 text-on-background">Support</h2>
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30">
              <SettingsRow icon={HelpCircle} title="Help Center" />
              <div className="h-px bg-outline-variant/20 mx-4" />
              <SettingsRow icon={ShieldCheck} title="Safety Center" />
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-4">
          <button className="w-full py-4 rounded-xl font-bold text-primary border-2 border-primary hover:bg-primary/5 transition-colors">
            Switch to Hosting
          </button>
          <button className="w-full py-4 rounded-xl font-bold text-error flex items-center justify-center gap-2 hover:bg-error/5 transition-colors">
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </main>
    </div>
  );
}

function SettingsRow({ icon: Icon, title }: { icon: any, title: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors active:bg-surface-container">
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-on-surface-variant" />
        <span className="font-bold text-on-surface">{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-outline" />
    </button>
  );
}
