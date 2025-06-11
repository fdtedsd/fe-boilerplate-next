import { App } from '@/components/App';
import { DesignTokensDemo } from '@/components/DesignTokensDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DesignTokensDemo />
      <div className="border-t border-border">
        <App />
      </div>
    </div>
  );
}
