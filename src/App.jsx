import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { MapPin, Mail, Phone, Globe, ChevronRight, User } from "lucide-react";
import useLanguageStore from "./store/useLanguageStore";

const translations = {
  en: {
    title: "Address Directory",
    address: "Address",
    name: "Name",
    email: "Email",
    phone: "Phone",
    website: "Website",
    switchToSpanish: "Switch to Spanish",
    switchToEnglish: "Switch to English",
    viewOnGoogleMaps: "View on Google Maps",
  },
  es: {
    title: "Directorio de Direcciones",
    address: "Dirección",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono",
    website: "Sitio web",
    switchToSpanish: "Cambiar a Español",
    switchToEnglish: "Cambiar a Inglés",
    viewOnGoogleMaps: "Ver en Google Maps",
  },
};

const stateCodes = {
  Alabama: "us-al",
  Alaska: "us-ak",
  Arizona: "us-az",
  Arkansas: "us-ar",
  California: "us-ca",
  Colorado: "us-co",
  Connecticut: "us-ct",
  Delaware: "us-de",
  Florida: "us-fl",
  Georgia: "us-ga",
  Hawaii: "us-hi",
  Idaho: "us-id",
  Illinois: "us-il",
  Indiana: "us-in",
  Iowa: "us-ia",
  Kansas: "us-ks",
  Kentucky: "us-ky",
  Louisiana: "us-la",
  Maine: "us-me",
  Maryland: "us-md",
  Massachusetts: "us-ma",
  Michigan: "us-mi",
  Minnesota: "us-mn",
  Mississippi: "us-ms",
  Missouri: "us-mo",
  Montana: "us-mt",
  Nebraska: "us-ne",
  Nevada: "us-nv",
  "New Hampshire": "us-nh",
  "New Jersey": "us-nj",
  "New Mexico": "us-nm",
  "New York": "us-ny",
  "North Carolina": "us-nc",
  "North Dakota": "us-nd",
  Ohio: "us-oh",
  Oklahoma: "us-ok",
  Oregon: "us-or",
  Pennsylvania: "us-pa",
  "Puerto Rico": "pr",
  "Rhode Island": "us-ri",
  "South Carolina": "us-sc",
  "South Dakota": "us-sd",
  Tennessee: "us-tn",
  Texas: "us-tx",
  Utah: "us-ut",
  Vermont: "us-vt",
  Virginia: "us-va",
  Washington: "us-wa",
  "West Virginia": "us-wv",
  Wisconsin: "us-wi",
  Wyoming: "us-wy",
};

export default function Component() {
  const [addresses, setAddresses] = useState({});
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => {
        const organizedAddresses = jsonData.reduce((acc, address) => {
          if (!acc[address.state]) {
            acc[address.state] = {};
          }
          if (!acc[address.state][address.city]) {
            acc[address.state][address.city] = [];
          }
          acc[address.state][address.city].push(address);
          return acc;
        }, {});
        setAddresses(organizedAddresses);
      });
  }, []);

  const t = translations[language] || translations.en;

  const getGoogleMapsUrl = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const getCompleteUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `http://${url}`;
    }
    return url;
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">{t.title}</h1>
      </div> */}

      <Accordion type="single" collapsible className="w-full space-y-4">
        {Object.entries(addresses)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([state, cities]) => (
            <AccordionItem
              key={state}
              value={state}
              className="border rounded-lg p-4"
            >
              <AccordionTrigger className="px-4 py-2">
                <img
                  src={`https://flagcdn.com/${stateCodes[state]}.svg`}
                  alt={`${state} flag`}
                  className="w-14 mr-2"
                />
                <span className="text-xl font-semibold">{state}</span>
              </AccordionTrigger>

              <AccordionContent className="px-4 pt-2 pb-4 mt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {Object.entries(cities)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([city, addressList]) => (
                      <div key={city} className="space-y-4">
                        <h1 className="text-l font-bold text-primary uppercase mr-8">
                          {city}
                        </h1>

                        {addressList.map((address) => (
                          <Card
                            key={address.ID}
                            className="overflow-hidden p-4 min-h-80"
                          >
                            <CardHeader className="bg-muted">
                              <CardTitle className="text-lg">
                                {address.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="">
                              <div className="space-y-2">
                                <p className="flex items-center">
                                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                                  <span>{address.name}</span>
                                </p>
                                <p className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                                  <a
                                    href={getGoogleMapsUrl(address.address)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm text-primary hover:underline"
                                  >
                                    {address.address}
                                  </a>
                                </p>
                                <p className="flex items-center ">
                                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                                  <a
                                    href={`mailto:${address.email}`}
                                    className="hover:underline"
                                  >
                                    {address.email}
                                  </a>
                                </p>
                                <p className="flex items-center">
                                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                                  <a
                                    href={`tel:${address.phone}`}
                                    className="hover:underline"
                                  >
                                    {address.phone}
                                  </a>
                                </p>
                                {address.website && (
                                  <p className="flex items-center">
                                    <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                                    <a
                                      href={getCompleteUrl(address.website)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                    >
                                      {t.website}
                                    </a>
                                  </p>
                                )}
                                <a
                                  href={getGoogleMapsUrl(address.address)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center mt-2 text-sm text-primary hover:underline"
                                >
                                  {t.viewOnGoogleMaps}
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </a>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
