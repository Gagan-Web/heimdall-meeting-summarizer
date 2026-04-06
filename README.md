# Meeting Summarizer

A desktop application that records microphone and system audio, transcribes meetings locally using Whisper, and generates structured notes.

## Current Status
- System and mic audio recording using FFmpeg (Working with windows for windows)
- Local Whisper transcription
- Node.js pipeline orchestration
- Preparing lightweight Electron UI

## Architecture
- FFmpeg to capture audio
- Node.js to process orchestration
- Python and Whisper (speech-to-text)
- Electron (UI shell)

## Goal
Record meetings, lectures, or live discussions and automatically generate notes on it for locally or cloud 

## Prerequisites
- Node.js (v18+ recommended)
- Python (3.8+)
- FFmpeg installed and available in PATH
- faster-whisper Python package 