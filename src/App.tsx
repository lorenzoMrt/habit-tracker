import { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, BarChart3, BookOpen, Users } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState({ name: '', description: '' });
  useEffect(() => {
    fetch('http://localhost:8080/habits', {method: 'GET'})
      .then(response => response.json())
      .then(data => setHabits(data))
      .catch(error => console.error('Error fetching habits:', error));
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHabit(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8080/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newHabit),
    })
      .then(response => response.json())
      .then(data => setHabits(prevHabits => [...prevHabits, data]))
      .catch(error => console.error('Error creating habit:', error));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Atomic Habits</span>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Sign In</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Habit</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Habit Name"
                  value={newHabit.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Habit Description"
                  value={newHabit.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  Add Habit
                </button>
              </div>
            </form>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Habits</h2>
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
              <div className="space-y-4">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle2
                        className={`h-6 w-6 ${
                          habit.completed ? 'text-green-500' : 'text-gray-400'
                        }`}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{habit.name}</p>
                        <p className="text-sm text-gray-500">{habit.description}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                      Complete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Progress</h2>
                <BarChart3 className="h-5 w-5 text-gray-500" />
              </div>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Progress visualization coming soon</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Community</h2>
                <Users className="h-5 w-5 text-gray-500" />
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    "Small habits make a big difference. Started meditation last month, now can't
                    imagine starting my day without it!"
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-2">- Sarah M.</p>
                </div>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  Share Your Story
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Tips</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Make it obvious - Place visual cues in your environment</li>
                <li>• Make it attractive - Pair habits with activities you enjoy</li>
                <li>• Make it easy - Reduce friction for good habits</li>
                <li>• Make it satisfying - Track your progress</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;