import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { linkToHouses } from '../Link/Link';

type MembersType = {
  name: string,
  slug: string,
};

type HousesType = {
  slug: string,
  name: string,
  members: MembersType [],
};

const Houses = () => {
  const [searchSlug, setSearchSlug] = useSearchParams();
  const [inputSlug, setInputSlug] = useState('');
  const [houses, setHouses] = useState<HousesType []>();

  const slugs = searchSlug.get('slug');

  useEffect(() => {
    axios.request<HousesType []>({ url: linkToHouses, method: 'GET' })
      .then((data) => { setHouses(data.data); });
  }, []);

  const searchInputSlug = (slug:string) => {
    const foundSlugs = houses?.filter((memory) => ({ ...memory, members: memory.members.filter((h) => h.name.includes(slug)) }));
    console.log(foundSlugs);
    setHouses(foundSlugs);
  };
  useEffect(() => {

  }, [searchInputSlug]);
  return (
    <div className="App">
      <input
        value={inputSlug}
        type="text"
        onChange={(e) => {
          setInputSlug(e.target.value);
          setSearchSlug({ slug: e.target.value });
        }}
        onKeyPress={(e) => { if (e.key === 'Enter') { setSearchSlug({ slug: inputSlug }); } }}
      />
      <button onClick={() => searchInputSlug(slugs as string)}> asd </button>
      {
        houses?.map((house) => (
          <div key={house.name}>
            <div>
              <h2>{house.name}</h2>
              <h3>{house.slug}</h3>
            </div>
            {house.members.map((member) => (
              <Link to={`/characters/${member.slug}`} key={member.name}>
                <p>{member.name}</p>
              </Link>
            ))}
          </div>
        ))
      }

    </div>
  );
};
export default Houses;
