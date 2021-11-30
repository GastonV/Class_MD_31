import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { linkToHouse } from '../Link/Link';

type HouseType = {
  name: string,
  slug: string,
};

type MemberType = {
  name: string,
  slug: string,
  house: HouseType
  quotes: string []
}

const House = () => {
  const { slug } = useParams<'slug'>();
  const slugLink = `${linkToHouse}${slug}`;
  const [house, setHouse] = useState<MemberType []>();
  useEffect(() => {
    axios.request<MemberType []>({ url: slugLink, method: 'GET' })
      .then((data) => { setHouse(data.data); });
  }, []);

  return (
    <div className="App">
      {
        house?.map((member) => (
          <div key={member.name}>
            <div>
              <h2>{member.name}</h2>
              <h3>{member.slug}</h3>
            </div>
            {member.quotes.map((quote) => (
              <Link to="/houses" key={Math.random()}>
                <p>{quote}</p>
              </Link>
            ))}
          </div>
        ))
      }
      <button> asd </button>

    </div>
  );
};
export default House;
