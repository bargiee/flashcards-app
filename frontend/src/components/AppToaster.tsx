import { Toaster } from 'react-hot-toast';

export default function AppToaster() {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#fff',
                    color: '#000',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    fontFamily: 'Barlow, sans-serif',
                },
                success: {
                    iconTheme: {
                        primary: '#22c55e',
                        secondary: '#e7ffe8',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#eb4444',
                        secondary: '#ffe7e7',
                    },
                },
            }}
        />
    );
}
