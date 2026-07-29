import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PracticeChallenge {
  title: string;
  topicLabel: string;
  progressLabel: string;
  sessionProgress: number;
  requirements: string[];
  starterCode: string;
}

const CHALLENGE: PracticeChallenge = {
  title: 'React Hooks: useEffect',
  topicLabel: 'Challenge 4 of 12 · Intermediate',
  progressLabel: 'Session Progress',
  sessionProgress: 33,
  requirements: [
    'Create a useTimer hook that increments every second',
    'Expose reset() and pause() controls',
    'Clean up the interval on unmount',
  ],
  starterCode: `function useTimer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // TODO: start an interval that increments count
  }, []);

  return { count };
}`,
};

@Injectable({ providedIn: 'root' })
export class PracticeChallengesService {
  getCurrentChallenge(): Observable<PracticeChallenge> {
    return of(CHALLENGE);
  }
}
