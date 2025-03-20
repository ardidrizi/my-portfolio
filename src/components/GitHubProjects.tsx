import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

interface GitHubProjectsProps {
  username: string;
  limit?: number;
  filter?: string[];
}

const GitHubProjects: React.FC<GitHubProjectsProps> = ({ username, limit = 6, filter = [] }) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data: Repository[] = await response.json();

        // Filter and sort repositories
        const filteredRepos = data
          .filter(repo => !repo.fork) // Exclude forked repositories
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, limit);

        setRepos(filteredRepos);
      } catch (err) {
        setError('Error fetching GitHub repositories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, limit]);

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter repositories by language or topic
  const getFilteredRepos = () => {
    if (activeFilter === 'all') return repos;
    return repos.filter(repo =>
      repo.language === activeFilter ||
      (repo.topics && repo.topics.includes(activeFilter))
    );
  };

  // Get unique languages and topics for filter
  const getFilterOptions = () => {
    const languages = new Set(repos.map(repo => repo.language).filter(Boolean) as string[]);
    const topics = new Set(repos.flatMap(repo => repo.topics));
    return ['all', ...Array.from(languages), ...Array.from(topics)];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-12 h-12 border-4 border-t-primary border-opacity-50 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-500 mb-4">
        <p>{error}</p>
        <p className="text-sm mt-2">
          Check your internet connection or try again later.
        </p>
      </div>
    );
  }

  const filteredRepos = getFilteredRepos();
  const filterOptions = getFilterOptions();

  return (
    <div className="github-projects">
      <div className="filter-controls mb-6 flex flex-wrap gap-2">
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => setActiveFilter(option)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === option
                ? 'bg-primary text-white'
                : 'bg-background hover:bg-opacity-80'
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {filteredRepos.length === 0 ? (
        <p className="text-center py-8">No repositories match the selected filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              {...{ className: "bg-background bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow" }}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold truncate">{repo.name}</h3>
                  <div className="flex items-center text-sm">
                    <span className="mr-3 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <p className="text-sm mb-4 text-gray-600 line-clamp-2 h-10">
                  {repo.description || 'No description available'}
                </p>

                <div className="mb-4">
                  {repo.language && (
                    <span className="inline-block bg-primary bg-opacity-10 text-primary px-2 py-1 rounded text-xs mr-2">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics && repo.topics.slice(0, 3).map(topic => (
                    <span key={topic} className="inline-block bg-secondary bg-opacity-10 text-secondary px-2 py-1 rounded text-xs mr-2 mb-1">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Updated: {formatDate(repo.updated_at)}
                  </span>
                  <div className="space-x-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded bg-accent text-white"
                      >
                        Demo
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded bg-primary text-white"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.48C17.139 18.197 20 14.44 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
          </svg>
          View all repositories
        </a>
      </div>
    </div>
  );
};

export default GitHubProjects;
