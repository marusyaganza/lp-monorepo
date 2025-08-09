import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styles from './SpeechInput.module.css';
import { Button } from '../Button/Button';
import { Language } from '../../generated/graphql';
import { FocusableHTMLElement } from '../../types/types';

export interface SpeechInputProps {
  onChange: (value: string) => void;
  isDisabled?: boolean;
  variant?: 'initial' | 'success' | 'error';
  dataCy?: string;
  language?: Language;
  className?: string;
}

const LANG_MAP: Record<Language, string> = {
  [Language.English]: 'en-US',
  [Language.Spanish]: 'es-ES'
};

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

type SpeechRecognitionEvent = {
  results: SpeechRecognitionResult[][];
};

type SpeechRecognitionObj = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: ErrorEvent) => void;
  abort: () => void;
  start: () => void;
};

type SpeechRecognition = new () => SpeechRecognitionObj;

export const SpeechInput = forwardRef<FocusableHTMLElement, SpeechInputProps>(
  ({ onChange, className, language, isDisabled, dataCy }, ref) => {
    const [error, setError] = useState('');
    const [accuracy, setAccuracy] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognition = useRef<SpeechRecognitionObj | null>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
      const SpeechRecognitionConstructor: SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognitionConstructor) {
        setError('Speech Recognition API is not supported in this browser.');
        return;
      }

      recognition.current = new SpeechRecognitionConstructor();
      recognition.current.lang = LANG_MAP[language || Language.English];
      recognition.current.interimResults = false;
      recognition.current.maxAlternatives = 3;

      recognition.current.onresult = handleResult;
      recognition.current.onerror = (event: ErrorEvent) => {
        setError(`Error occurred: ${event.error}`);
        setIsListening(false);
        clearTimeoutIfSet();
      };

      // Cleanup on unmount
      return () => {
        recognition.current?.abort();
        clearTimeoutIfSet();
      };
    }, []);

    // Helper to clear the timeout
    const clearTimeoutIfSet = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleResult = (event: SpeechRecognitionEvent) => {
      clearTimeoutIfSet();
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      const confidence = event.results[0][0].confidence || 0;
      setIsListening(false);
      setAccuracy(Math.floor(confidence * 100).toString());
      setError('');
      onChange(transcript);
    };

    const handleTimeout = () => {
      setIsListening(false);
      setError('Not recognized. Please try again.');
      recognition.current?.abort();
    };

    const startListening = () => {
      if (!isListening && recognition.current) {
        setError('');
        setIsListening(true);
        setAccuracy('');
        recognition.current.start();

        // Set a 5-second timeout for speech input
        clearTimeoutIfSet();
        timeoutRef.current = window.setTimeout(handleTimeout, 5000);
      }
    };

    return (
      <div className={styles.container}>
        <Button
          ref={ref}
          variant="icon"
          iconHeight={50}
          iconWidth={50}
          iconId="mic"
          onClick={startListening}
          disabled={isListening || isDisabled}
          className={className}
          aria-label="Start speaking"
          data-cy={dataCy}
        >
          Microphone
        </Button>
        {error && (
          <p
            aria-hidden={!error}
            data-cy="input-error"
            role="status"
            className={styles.errorText}
          >
            {error}
          </p>
        )}
        {isListening && <p>Listening</p>}
        {accuracy && !isListening && (
          <p className={styles.accuracy}>{`Accuracy: ${accuracy}%`}</p>
        )}
      </div>
    );
  }
);

SpeechInput.displayName = 'SpeechInput';
