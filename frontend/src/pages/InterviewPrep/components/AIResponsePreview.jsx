import { LuCopy, LuCheck, LuCode } from 'react-icons/lu';
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const AIResponsePreview = ({ content }) => {
    if (!content) return null;
    return (
        <div className="w-full">
            <div className="text-[15px] md:text-base leading-relaxed prose prose-slate dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({node,className,children,...props}) {
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : '';
                            const isInline = !className;
                            return !isInline ? (
                                <CodeBlock
                                    code={String(children).replace(/\n$/, '')}
                                    language={language}
                                />
                            ) : (
                                <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-violet-600 dark:text-violet-400 rounded-md text-sm font-semibold' {...props}>
                                    {children}
                                </code>
                            );
                        },
                        p({ children }) { return <p className="mb-4">{children}</p>; },
                        strong({ children }) { return <strong className="font-bold text-gray-900 dark:text-white pb-0.5">{children}</strong>; },
                        em({ children }) { return <em className="text-violet-600 dark:text-violet-400 font-medium italic">{children}</em>; },
                        ul({ children }) { return <ul className="list-disc pl-6 space-y-2 my-4 text-gray-700 dark:text-gray-300">{children}</ul>; },
                        ol({children}){ return <ol className='list-decimal pl-6 space-y-2 my-4 text-gray-700 dark:text-gray-300'>{children}</ol>; },
                        li({children}){ return <li className='mb-1'>{children}</li>; },
                        blockquote({children}){ return <blockquote className='border-l-4 border-violet-500 bg-violet-50 dark:bg-violet-900/10 pl-4 py-2 italic my-5 rounded-r-lg text-gray-700 dark:text-gray-300'>{children}</blockquote>; },
                        h1({children}){ return <h1 className='text-3xl font-extrabold mt-8 mb-4 text-gray-900 dark:text-white tracking-tight'>{children}</h1>; },
                        h2({children}){ return <h2 className='text-2xl font-bold mt-7 mb-3 text-gray-900 dark:text-white'>{children}</h2>; },
                        h3({children}){ return <h3 className='text-lg font-bold mt-6 mb-2 text-violet-700 dark:text-violet-400'>{children}</h3>; },
                        h4({children}){ return <h4 className='text-base font-bold mt-5 mb-2 text-gray-900 dark:text-gray-200'>{children}</h4>; },
                        a({children, href}){ return <a href={href} className='text-fuchsia-600 dark:text-fuchsia-400 hover:underline font-medium'>{children}</a>; },
                        table({children}){
                            return(
                                <div className='overflow-x-auto my-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm'>
                                    <table className='min-w-full divide-y divide-gray-200 dark:divide-white/10'>
                                        {children}
                                    </table>
                                </div>
                            );
                        },
                        thead({children}){ return <thead className='bg-gray-50 dark:bg-white/5'>{children}</thead>; },
                        tbody({children}){ return <tbody className='divide-y divide-gray-200 dark:divide-white/5 bg-white dark:bg-transparent'>{children}</tbody>; },
                        tr({children}){ return <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">{children}</tr>; },
                        th({children}){ return <th className='px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>{children}</th>; },
                        td({children}){ return <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>{children}</td>; },
                        hr(){ return <hr className='my-8 border-gray-200 dark:border-white/10'></hr>; },
                        img({src,alt}){ return <img src={src} alt={alt} className='my-6 max-w-full rounded-xl shadow-md border border-gray-100 dark:border-white/10'></img>; }
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

function CodeBlock({ code, language }) {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f172a] shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center space-x-2">
                    <LuCode size={16} className="text-violet-500 dark:text-violet-400" />
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 tracking-wider uppercase">
                        {language || 'Code'}
                    </span>
                </div>
                <button
                    onClick={copyCode}
                    className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 focus:outline-none relative group transition-colors"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <LuCheck size={18} className="text-green-500" />
                    ) : (
                        <LuCopy size={18} />
                    )}
                    {copied && (
                        <span className="absolute -top-8 right-0 bg-black text-white text-[10px] uppercase font-bold tracking-widest rounded-md px-2 py-1 opacity-80 group-hover:opacity-100 transition ">
                            COPIED
                        </span>
                    )}
                </button>
            </div>
            <div className="overflow-x-auto bg-gray-50 dark:bg-transparent">
                <SyntaxHighlighter
                    language={language || 'text'}
                    style={vscDarkPlus}
                    customStyle={{ fontSize: 13, margin: 0, padding: '1.25rem', background: 'transparent' }}
                    showLineNumbers={false}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default AIResponsePreview;