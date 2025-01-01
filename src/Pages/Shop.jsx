import React, { useState } from 'react';
import Categor from '../Components/Category';
import Product from '../Components/Product';
import Downheader from '../Components/Downheader';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div><Downheader/>
    <div className="flex flex-col pl-28 md:flex-row  min-h-screen">
      <Categor onCategorySelect={handleCategorySelect} />
      <div className="flex-1 p-6 bg-white">
        <Product selectedCategory={selectedCategory} />
      </div>
    </div></div>
  );
};

export default App;
