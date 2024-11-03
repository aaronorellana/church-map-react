import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Globe, ChevronRight, User } from "lucide-react";
import Flag from "react-world-flags";
import useLanguageStore from "./useLanguageStore";

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
  Alabama: "US-AL",
  Alaska: "US-AK",
  Arizona: "US-AZ",
  Arkansas: "US-AR",
  California: "US-CA",
  Colorado: "US-CO",
  Connecticut: "US-CT",
  Delaware: "US-DE",
  Florida: "US-FL",
  Georgia: "US-GA",
  Hawaii: "US-HI",
  Idaho: "US-ID",
  Illinois: "US-IL",
  Indiana: "US-IN",
  Iowa: "US-IA",
  Kansas: "US-KS",
  Kentucky: "US-KY",
  Louisiana: "US-LA",
  Maine: "US-ME",
  Maryland: "US-MD",
  Massachusetts: "US-MA",
  Michigan: "US-MI",
  Minnesota: "US-MN",
  Mississippi: "US-MS",
  Missouri: "US-MO",
  Montana: "US-MT",
  Nebraska: "US-NE",
  Nevada: "US-NV",
  "New Hampshire": "US-NH",
  "New Jersey": "US-NJ",
  "New Mexico": "US-NM",
  "New York": "US-NY",
  "North Carolina": "US-NC",
  "North Dakota": "US-ND",
  Ohio: "US-OH",
  Oklahoma: "US-OK",
  Oregon: "US-OR",
  Pennsylvania: "US-PA",
  "Rhode Island": "US-RI",
  "South Carolina": "US-SC",
  "South Dakota": "US-SD",
  Tennessee: "US-TN",
  Texas: "US-TX",
  Utah: "US-UT",
  Vermont: "US-VT",
  Virginia: "US-VA",
  Washington: "US-WA",
  "West Virginia": "US-WV",
  Wisconsin: "US-WI",
  Wyoming: "US-WY",
};

export default function Component() {
  const [addresses, setAddresses] = useState({});
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    fetch("/public/data.json")
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

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">{t.title}</h1>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {Object.entries(addresses)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([state, cities]) => (
            <AccordionItem
              key={state}
              value={state}
              className="border rounded-lg p-4"
            >
              <AccordionTrigger className="px-4 py-2 hover:bg-muted flex items-center">
                <Flag code={stateCodes[state]} className="w-6 h-6 mr-2" />
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
                            className="overflow-hidden p-4 min-h-60"
                          >
                            <CardHeader className="bg-muted">
                              <CardTitle className="text-base">
                                {address.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
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
                                      href={address.website}
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
