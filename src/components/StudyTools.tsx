import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Play, Pause, RotateCcw, Music, HelpCircle, X } from 'lucide-react';

const StudyTools = () => {
  // Pomodoro Timer State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [pomodoroCycles, setPomodoroCycles] = useState(0);
  const pomodoroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Music Widget State
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  
  // Help State
  const [showPomodoroHelp, setShowPomodoroHelp] = useState(false);
  const [showMusicHelp, setShowMusicHelp] = useState(false);

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pomodoro timer logic
  useEffect(() => {
    if (isPomodoroRunning && pomodoroTime > 0) {
      pomodoroIntervalRef.current = setInterval(() => {
        setPomodoroTime((prev) => {
          if (prev <= 1) {
            // Timer finished
            setIsPomodoroRunning(false);
            
            if (pomodoroMode === 'work') {
              // Switch to break
              setPomodoroMode('break');
              setPomodoroTime(5 * 60); // 5 minute break
              setPomodoroCycles(prev => prev + 1);
            } else {
              // Switch to work
              setPomodoroMode('work');
              setPomodoroTime(25 * 60); // 25 minute work
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
      }
    }

    return () => {
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
      }
    };
  }, [isPomodoroRunning, pomodoroTime, pomodoroMode]);

  const togglePomodoro = () => {
    setIsPomodoroRunning(!isPomodoroRunning);
  };

  const resetPomodoro = () => {
    setIsPomodoroRunning(false);
    setPomodoroMode('work');
    setPomodoroTime(25 * 60);
    setPomodoroCycles(0);
  };

  return (
    <div className="fixed top-20 left-4 z-50 flex flex-col space-y-3 w-72">
      {/* Header */}
      <motion.div 
        className="bg-white/[0.08] backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <h2 className="text-lg font-bold text-white mb-1">Additional Study Tools</h2>
          <p className="text-xs text-white/60">Enhance your learning experience</p>
        </div>
      </motion.div>

      {/* Pomodoro Timer */}
      <motion.div 
        className="bg-white/[0.08] backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <Timer className="h-4 w-4 text-blue-300 mr-2" />
            <h3 className="text-sm font-semibold">Study Timer</h3>
            <button
              onClick={() => setShowPomodoroHelp(!showPomodoroHelp)}
              className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <HelpCircle className="h-3 w-3 text-white/60" />
            </button>
          </div>
          
          <div className={`text-2xl font-mono font-bold mb-3 ${
            pomodoroMode === 'work' ? 'text-blue-300' : 'text-green-300'
          }`}>
            {formatTime(pomodoroTime)}
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              pomodoroMode === 'work' 
                ? 'bg-blue-500/20 text-blue-200' 
                : 'bg-green-500/20 text-green-200'
            }`}>
              {pomodoroMode === 'work' ? '🍅 Work' : '☕ Break'}
            </div>
            <div className="text-white/60 text-xs">
              Cycles: {pomodoroCycles}
            </div>
          </div>
          
          <div className="flex space-x-2 justify-center">
            <button
              onClick={togglePomodoro}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                isPomodoroRunning
                  ? 'bg-red-500/20 text-red-200 hover:bg-red-500/30'
                  : 'bg-green-500/20 text-green-200 hover:bg-green-500/30'
              }`}
            >
              {isPomodoroRunning ? (
                <>
                  <Pause className="h-3 w-3 inline mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 inline mr-1" />
                  Start
                </>
              )}
            </button>
            
            <button
              onClick={resetPomodoro}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
            >
              <RotateCcw className="h-3 w-3 inline mr-1" />
              Reset
            </button>
          </div>
        </div>
        
        {/* Pomodoro Help */}
        {showPomodoroHelp && (
          <motion.div 
            className="mt-3 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-semibold text-blue-200">Benefits of Pomodoro Timer:</h4>
              <button
                onClick={() => setShowPomodoroHelp(false)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="h-3 w-3 text-white/60" />
              </button>
            </div>
            <ul className="text-xs text-blue-100 space-y-1">
              <li>• Improves focus and concentration</li>
              <li>• Prevents burnout with regular breaks</li>
              <li>• Creates sense of urgency and productivity</li>
              <li>• Helps track study time effectively</li>
              <li>• Reduces procrastination</li>
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Music Widget Toggle */}
      <motion.div 
        className="bg-white/[0.08] backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <Music className="h-4 w-4 text-purple-300 mr-2" />
            <h3 className="text-sm font-semibold">Focus Music</h3>
            <button
              onClick={() => setShowMusicHelp(!showMusicHelp)}
              className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <HelpCircle className="h-3 w-3 text-white/60" />
            </button>
          </div>
          
          <button
            onClick={() => setIsMusicOpen(!isMusicOpen)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isMusicOpen
                ? 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'
                : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
            }`}
          >
            {isMusicOpen ? '🎵 Hide Player' : '🎵 Show Player'}
          </button>
        </div>
      </motion.div>

      {/* Music Help Modal */}
      {showMusicHelp && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowMusicHelp(false)}
        >
          <motion.div
            className="bg-white/[0.1] backdrop-blur-md rounded-xl p-6 max-w-md w-full border border-white/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Focus Music Help</h3>
              <button
                onClick={() => setShowMusicHelp(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-white/60" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-white/80">
              <p>🎵 <strong>Lofi Study Music:</strong> Ambient background music designed to enhance focus and concentration.</p>
              <p>🎧 <strong>Features:</strong> Customizable beats, ambient sounds, and relaxing melodies.</p>
              <p>⚙️ <strong>Controls:</strong> Use the embedded player to adjust volume, tempo, and instrument levels.</p>
              <p>💡 <strong>Tip:</strong> Lower volume settings work best for maintaining focus while studying.</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Music Widget */}
      {isMusicOpen && (
        <motion.div
          className="bg-white/[0.08] backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/10 w-80"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-3">
            <h4 className="text-sm font-semibold text-purple-200">Lofi Study Music</h4>
          </div>
          
          <div className="w-full h-64 rounded-lg overflow-hidden border border-white/10">
            <iframe 
              src="https://magenta.github.io/lofi-player/?data=%7B%22master%22%3A%7B%22bpm%22%3A75%2C%22reverb%22%3A0%2C%22filter%22%3A20000%2C%22volume%22%3A0.3%7D%2C%22melody%22%3A%7B%22mute%22%3Afalse%2C%22index%22%3A0%2C%22secondIndex%22%3A1%2C%22interpolationIndex%22%3A0%2C%22instrumentIndex%22%3A1%2C%22volumeSliderValue%22%3A%22100%22%2C%22swing%22%3A0%7D%2C%22chords%22%3A%7B%22mute%22%3Atrue%2C%22index%22%3A0%2C%22instrumentIndex%22%3A0%2C%22volumeSliderValue%22%3A%22100%22%2C%22swing%22%3A0%7D%2C%22backgroundSounds%22%3A%7B%22mute%22%3Afalse%2C%22volumeSliderValue%22%3A%22100%22%2C%22toneSliderValue%22%3A%22100%22%2C%22index%22%3A0%7D%2C%22drum%22%3A%7B%22mute%22%3Afalse%2C%22patternIndex%22%3A0%2C%22volumeSliderValue%22%3A%22100%22%2C%22toneSliderValue%22%3A%2250%22%7D%2C%22bass%22%3A%7B%22mute%22%3Atrue%2C%22volumeSliderValue%22%3A%22100%22%2C%22toneSliderValue%22%3A%2220%22%7D%2C%22assets%22%3A%7B%22boardText%22%3A%22Vibert+Thio+2020.%22%7D%7D" 
              allow="autoplay"
              className="w-full h-full border-none"
              title="Lofi Study Music Player"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StudyTools;
