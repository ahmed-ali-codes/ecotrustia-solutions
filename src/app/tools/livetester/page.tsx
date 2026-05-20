"use client";
import React, { useState, useEffect, useRef } from 'react';
import './livetester.css'; // Import the new CSS file

const LiveCodeTester: React.FC = () => {
    const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Edit this code to see live changes</p>
</body>
</html>`);
    const [css, setCss] = useState(`body {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 50px;
  color: #3498db;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}`);
    const [js, setJs] = useState(`document.querySelector('h1').addEventListener('click', function() {
  this.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
});`);
    const [activeTab, setActiveTab] = useState('html');
    const previewFrame = useRef<HTMLIFrameElement>(null);

    const updatePreview = () => {
        if (previewFrame.current) {
            const document = previewFrame.current.contentDocument;
            if (document) {
                document.open();
                document.write(`
                    <html>
                        <head>
                            <style>${css}</style>
                        </head>
                        <body>
                            ${html}
                            <script>${js}<\/script>
                        </body>
                    </html>
                `);
                document.close();
            }
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            updatePreview();
        }, 300);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all code editors?")) {
            setHtml(`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Edit this code to see live changes</p>
</body>
</html>`);
            setCss(`body {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 50px;
  color: #3498db;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}`);
            setJs(`document.querySelector('h1').addEventListener('click', function() {
  this.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
});`);
        }
    };

    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>Code Live Tester</h1>
                    <p>
                        Test your HTML, CSS, and JavaScript code in real-time with our
                        interactive code editor. See instant results as you type!
                    </p>
                </div>
            </section>
            <section className="section" id="tester">
                <div className="section-title">
                    <h2>Interactive Code Tester</h2>
                </div>

                <div className="tester-container">
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'html' ? 'active' : ''}`} onClick={() => setActiveTab('html')}>
                            HTML
                        </button>
                        <button className={`tab ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')}>
                            CSS
                        </button>
                        <button className={`tab ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')}>
                            JavaScript
                        </button>
                    </div>

                    <div className="editor-container">
                        <div className={`editor ${activeTab === 'html' ? 'active' : ''}`} id="html-editor">
                            <textarea id="html" placeholder="Write your HTML code here..." value={html} onChange={(e) => setHtml(e.target.value)} />
                        </div>
                        <div className={`editor ${activeTab === 'css' ? 'active' : ''}`} id="css-editor">
                            <textarea id="css" placeholder="Write your CSS code here..." value={css} onChange={(e) => setCss(e.target.value)} />
                        </div>
                        <div className={`editor ${activeTab === 'js' ? 'active' : ''}`} id="js-editor">
                            <textarea id="js" placeholder="Write your JavaScript code here..." value={js} onChange={(e) => setJs(e.target.value)} />
                        </div>
                    </div>
                </div>

                <h3 style={{ marginBottom: '1rem' }}>Live Preview:</h3>
                <iframe id="preview" ref={previewFrame} title="Live Preview"></iframe>

                <div className="tester-actions">
                    <button className="btn btn-outline" id="reset-btn" onClick={handleReset}>
                        Reset Code
                    </button>
                </div>
            </section>
        </>
    );
};

export default LiveCodeTester;