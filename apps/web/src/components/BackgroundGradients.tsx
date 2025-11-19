export default function BackgroundGradients() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
            {/* Primary gradient ellipse */}
            <div
                className="absolute rounded-full blur-3xl opacity-30"
                style={{
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
                    top: '10%',
                    left: '5%',
                }}
            />

            {/* Secondary gradient ellipse */}
            <div
                className="absolute rounded-full blur-3xl opacity-20"
                style={{
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)',
                    bottom: '5%',
                    right: '10%',
                }}
            />

            {/* Decorative pattern (simplified from Figma subtract) */}
            <div
                className="absolute opacity-10"
                style={{
                    width: '400px',
                    height: '400px',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, transparent 100%)',
                    top: '50%',
                    right: '5%',
                    transform: 'translateY(-50%) rotate(45deg)',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }}
            />
        </div>
    );
}
