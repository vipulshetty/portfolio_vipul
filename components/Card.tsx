'use client'

import React from 'react';
import styled from 'styled-components';

interface CardProps {
  command: string;
}

const Card = ({ command }: CardProps) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="wrap">
          <div className="terminal">
            <hgroup className="head">
              <p className="title">
                <svg width="16px" height="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none">
                  <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
                </svg>
                Terminal
              </p>
              <button className="copy_toggle" tabIndex={-1} type="button">
                <svg width="16px" height="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none">
                  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                </svg>
              </button>
            </hgroup>
            <div className="body">
              <pre className="pre">
                <code>-&nbsp;</code>
                <code>npx&nbsp;</code>
                <code className="cmd" data-cmd={command} />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    padding: 1rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    background-color: rgba(30, 30, 30, 0.4);
    backdrop-filter: blur(8px);
    min-width: 344px;
  }
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    z-index: 10;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  .terminal {
    display: flex;
    flex-direction: column;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    min-height: 40px;
    padding-inline: 12px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #202425;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 2.5rem;
    user-select: none;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #8e8e8e;
  }
  .title > svg {
    height: 18px;
    width: 18px;
    margin-top: 2px;
    color: #006adc;
  }
  .copy_toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border: 0.65px solid rgba(255, 255, 255, 0.1);
    margin-left: auto;
    border-radius: 6px;
    background-color: #202425;
    color: #8e8e8e;
    cursor: pointer;
  }
  .copy_toggle > svg {
    width: 20px;
    height: 20px;
  }
  .copy_toggle:active > svg > path,
  .copy_toggle:focus-within > svg > path {
    animation: clipboard-check 500ms linear forwards;
  }
  .body {
    display: flex;
    flex-direction: column;
    position: relative;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow-x: auto;
    padding: 1rem;
    line-height: 19px;
    color: white;
    background-color: #0f0f0f;
    white-space: nowrap;
  }
  .pre {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-wrap: nowrap;
    white-space: pre;
    background-color: transparent;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 16px;
  }
  .pre code:nth-child(1) {
    color: #575757;
  }
  .pre code:nth-child(2) {
    color: #e34ba9;
  }
  .cmd {
    height: 19px;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    color: #e34ba9;
  }
  .cmd::before {
    content: attr(data-cmd);
    position: relative;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    background-color: transparent;
    animation: inputs 4s steps(22) infinite;
  }
  .cmd::after {
    content: "";
    position: relative;
    display: block;
    height: 100%;
    width: 4px;
    background-color: #e34ba9;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @keyframes inputs {
    0% {
      width: 0;
    }
    50% {
      width: 215px;
    }
    100% {
      width: 0;
    }
  }

  @keyframes clipboard-check {
    100% {
      color: #fff;
      d: path(
        "M 9 5 H 7 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 10 a 2 2 0 0 0 2 -2 V 7 a 2 2 0 0 0 -2 -2 h -2 M 9 5 a 2 2 0 0 0 2 2 h 2 a 2 2 0 0 0 2 -2 M 9 5 a 2 2 0 0 1 2 -2 h 2 a 2 2 0 0 1 2 2 v 0 a 2 2 0 0 1 -2 2 h-2a2 2 0 0 1 -2 -2z"
      );
    }
  }
`;

export default Card;
