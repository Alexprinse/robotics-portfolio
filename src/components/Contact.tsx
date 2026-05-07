import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface TerminalLine {
    text: string;
    isCommand: boolean;
    color?: string;
}

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
        { text: '> root@robo.dev:~$ initialize_system', isCommand: true },
        { text: '> System initialized.', isCommand: false, color: 'var(--accent-green)' },
        { text: '> Type "help" to see available commands.', isCommand: false, color: '#aaa' }
    ]);
    const [terminalInput, setTerminalInput] = useState('');
    const terminalContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (terminalContainerRef.current) {
            terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [terminalHistory]);

    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!terminalInput.trim()) return;

        const cmd = terminalInput.trim().toLowerCase();
        const newHistory = [...terminalHistory, { text: `> guest@robo.dev:~$ ${cmd}`, isCommand: true }];

        let response: TerminalLine[] = [];
        switch (cmd) {
            case 'help':
                response = [
                    { text: 'Available commands:', isCommand: false, color: 'var(--accent-blue)' },
                    { text: '  help       - Show this message', isCommand: false },
                    { text: '  ls         - List directories', isCommand: false },
                    { text: '  whoami     - Identify current user', isCommand: false },
                    { text: '  contact    - Print contact info', isCommand: false },
                    { text: '  clear      - Clear terminal', isCommand: false }
                ];
                break;
            case 'ls':
                response = [{ text: 'projects/  skills/  resume.pdf  src/', isCommand: false, color: 'var(--accent-green)' }];
                break;
            case 'whoami':
                response = [{ text: 'SHALEM BAKTH SINGH BADAMPUDI', isCommand: false, color: 'var(--accent-blue)' }];
                break;
            case 'contact':
                response = [
                    { text: 'Email: princebadampudi@gmail.com', isCommand: false },
                    { text: 'Phone: 6302251158', isCommand: false },
                    { text: 'Location: Eluru, Andhra Pradesh, INDIA', isCommand: false },
                    { text: 'LinkedIn: linkedin.com/in/shalembakthsingh', isCommand: false }
                ];
                break;
            case 'clear':
                setTerminalHistory([]);
                setTerminalInput('');
                return;
            default:
                response = [{ text: `Command not found: ${cmd}`, isCommand: false, color: '#ef4444' }];
        }

        setTerminalHistory([...newHistory, ...response]);
        setTerminalInput('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        // NOTE: You need to replace these with your own EmailJS keys
        // Get these at https://dashboard.emailjs.com/
        const SERVICE_ID = 'service_9ldt19h'; // Replace with your Service ID
        const TEMPLATE_ID = 'template_8x4ethm'; // Replace with your Template ID
        const PUBLIC_KEY = 'W3NTTHqXUaDSrUjZo'; // Replace with your Public Key

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_name: 'Shalem', // You can customize this
                },
                PUBLIC_KEY
            );

            setTerminalHistory(prev => [...prev, {
                text: `> SUCCESS: Message transmitted to central hub.`,
                isCommand: false,
                color: 'var(--accent-green)'
            }]);

            setName('');
            setEmail('');
            setMessage('');
            alert('Transmission Successful: Message has been sent.');
        } catch (error) {
            console.error('EmailJS Error:', error);
            setTerminalHistory(prev => [...prev, {
                text: `> ERROR: Transmission failed. Check frequency stability.`,
                isCommand: false,
                color: '#ef4444'
            }]);
            alert('Transmission Failed. Please try again or use the "Copy Email" option.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="visible">
            <h2 className="section-title">Open_Comm_Link()</h2>
            <div className="contact-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter Designation (Name)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter Frequency (Email)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <textarea
                            placeholder="Transmit Message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button type="submit" className="btn btn-primary" disabled={isSending}>
                            {isSending ? 'Transmitting...' : 'Transmit'}
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={(e) => {
                                navigator.clipboard.writeText('princebadampudi@gmail.com');
                                const target = e.currentTarget;
                                const originalText = target.innerText;
                                target.innerText = 'Copied ✓';
                                target.style.borderColor = 'var(--accent-green)';
                                target.style.color = 'var(--accent-green)';
                                setTimeout(() => {
                                    target.innerText = originalText;
                                    target.style.borderColor = '';
                                    target.style.color = '';
                                }, 2000);
                            }}
                        >
                            Copy Email
                        </button>
                        <a href="https://www.linkedin.com/in/shalembakthsingh/" target="_blank" rel="noopener noreferrer" className="btn" style={{ textDecoration: 'none' }}>
                            LinkedIn ↗
                        </a>
                    </div>
                </form>

                <div className="contact-terminal" ref={terminalContainerRef} style={{ height: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flexGrow: 1 }}>
                        {terminalHistory.map((line, index) => (
                            <div key={index} style={{ color: line.color || (line.isCommand ? '#fff' : '#aaa'), marginBottom: '0.3rem' }}>
                                {line.text}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', marginTop: '1rem', borderTop: '1px solid var(--hud-border)', paddingTop: '1rem' }}>
                        <span style={{ color: 'var(--accent-green)', marginRight: '0.5rem' }}>&gt;</span>
                        <input
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontFamily: 'var(--font-mono)',
                                outline: 'none',
                                flexGrow: 1,
                                fontSize: '0.9rem'
                            }}
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
