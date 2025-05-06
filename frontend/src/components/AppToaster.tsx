import { Toaster } from 'react-hot-toast';

export default function AppToaster() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#fff',
                    color: '#000',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
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
