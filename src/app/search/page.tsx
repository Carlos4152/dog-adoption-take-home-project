"use client";

import { useState, useEffect } from "react";
import {
  fetchBreeds,
  searchDogs,
  fetchDogsByIds,
  matchDog,
} from "../../lib/api";

const SearchPage = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const loadBreeds = async () => {
      const response = await fetchBreeds();
      setBreeds(response.data);
    };

    loadBreeds();
  }, []);

  useEffect(() => {
    const loadDogs = async () => {
      const params = { breeds: [selectedBreed], sort: `breed:${sortOrder}` };
      const response = await searchDogs(params);
      const dogIds = response.data.resultIds;
      const dogDetails = await fetchDogsByIds(dogIds);
      console.log(dogDetails)
      setDogs(dogDetails.data);
    };

    if (selectedBreed) {
      loadDogs();
    }
  }, [selectedBreed, sortOrder]);

  const handleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleMatch = async () => {
    const response = await matchDog(favorites);
    alert(`Your match is: ${response.data.match}`);
  };

  return (
    <div className="container mx-auto py-8 px-2">
      <h1 className="text-4xl font-extrabold py-10 text-[#973131]">Search Dogs</h1>

      <div className="pt-5 grid md:grid-cols-2 items-center py-3">
        <div className=" py-2 w-full grid md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-y-4">
            <label className="font-semibold ">Breed</label>
            <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              <option value="">Select a breed</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-4">
            <label className="font-semibold">Sort Order:</label>
            <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

        </div>
        <div className="flex flex-col justify-end items-end">
          <p className="py-4"></p>
          {favorites.length > 0 && (
            <button
              onClick={handleMatch}
              className="bg-[#E0A75E] text-white font-semibold py-2 px-5 rounded-md hover:bg-[#F9D689] transition-all ease-in-out duration-200"
            >
              Find a Match
            </button>
          )}
        </div>
      </div>

      <div className="grid  md:grid-cols-3  lg:grid-cols-4 gap-5 pt-8">
        {dogs.map((dog) => (
          <div key={dog.id} className="border relative">
            <div className="flex justify-between py-4 px-3 bg-[#973131] text-white text-xl">
              <h2 className="font-extrabold  ">{dog.name}</h2>
              <div className="flex gap-2 items-center">
                <p>
                  <span className="font-bold">Age: </span>
                  {dog.age}
                </p>
              </div>
            </div>
            <img
              src={dog.img}
              alt={dog.name}
              className="w-[100%] h-[350px] object-cover"
            />
            <div className="flex justify-between py-4 px-3 bg-[#973131] text-white">
              <div>
                <p className="font-bold">Breed:</p>
                <small> {dog.breed}</small>
              </div>
              <div>
                <p className="font-bold">ZIP:</p>
                <small> {dog.zip_code}</small>
              </div>
            </div>
              <div className="absolute  end-0 top-20 mr-4 rounded-full flex justify-center items-center p-1 hover:bg-[#973131] transition-all ease-in-out duration-200">
                <button onClick={() => handleFavorite(dog.id)}>
                  {favorites.includes(dog.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#f56565"
                      stroke="#f56565"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-heart"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-heart"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  )}
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
