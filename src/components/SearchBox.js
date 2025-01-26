import React, { useState } from 'react';
import client from '../services/grpcClient';
import { SearchQuestionsRequest } from '../generated/search_pb';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchQuestions = () => {
    const request = new SearchQuestionsRequest();
    request.setQuery(query);
    request.setPage(1);
    request.setResultsPerPage(5);

    client.searchQuestions(request, {}, (err, response) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
      setResults(response.getQuestionsList().map(q => ({ id: q.getId(), title: q.getTitle(), type: q.getType() })));
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions by title..."
      />
      <button onClick={searchQuestions}>Search</button>

      <div>
        {results.map(({ id, title, type }) => (
          <div key={id}>
            <h3>{title}</h3>
            <p>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
