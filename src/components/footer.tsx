import { Target } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-white mt-12">
            <div className="container mx-auto py-6 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    <span className="text-sm font-semibold">SiapJual.ai</span>
                </div>
                <p className="text-sm text-gray-500 text-center sm:text-right">© {new Date().getFullYear()} SiapJual.ai. All rights reserved.</p>
            </div>
        </footer>
    );
}
