import { useState } from "react";
import CitySearch from "../components/CitySearch";
import ProfileForm from "../components/ProfileForm";
import LifeFitScore from "../components/LifeFitScore";
import DecisionCard from "../components/DecisionCard";

export default function Home() {
  const [city, setCity] = useState(null);
  const [profile, setProfile] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>LifeFit Simulator</h1>
      <p>Does this city fit your life?</p>

      <CitySearch onSelectCity={setCity} />
      <ProfileForm onSubmitProfile={setProfile} />

      {city && profile && (
        <>
          <LifeFitScore city={city} profile={profile} />
          <DecisionCard city={city} profile={profile} />
        </>
      )}
    </div>
  );
}
