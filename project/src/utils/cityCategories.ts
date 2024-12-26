export const cityCategories = {
  rannareis: [
    'Alicante', 'Barcelona', 'Corfu', 'Heraklion (Crete)', 'Ibiza', 'Larnaca',
    'Malaga', 'Mallorca', 'Malta', 'Mykonos', 'Nice', 'Santorini', 'Split',
    'Rhodes', 'Tenerife', 'Sharm El Sheikh', 'Hurghada'
  ],
  suurlinnad: [
    'London', 'Paris', 'Rome', 'Barcelona', 'Madrid', 'Berlin',
    'Vienna', 'Amsterdam', 'Milan', 'Prague', 'Budapest', 'Warsaw'
  ],
  keskEuroopa: [
    'Vienna', 'Prague', 'Budapest', 'Warsaw', 'Berlin', 'Munich',
    'Zurich', 'Frankfurt', 'Milan'
  ],
  pohjaEuroopa: [
    'Tallinn', 'Stockholm', 'Oslo', 'Gdansk', 'Bergen', 'Stavanger', 
    'Tromsø', 'Trondheim'
  ],
  vahemeri: [
    'Barcelona', 'Rome', 'Venice', 'Naples', 'Marseille', 
    'Thessaloniki', 'Athens', 'Valencia'
  ],
  keskAasia: [
    'Almaty', 'Tashkent', 'Samarkand', 'Astana', 'Bishkek'
  ],
  lahisIda: [
    'Abu Dhabi', 'Amman', 'Tel Aviv', 'Doha', 'Kuwait City',
    'Medina', 'Muscat', 'Riyadh'
  ],
  balkanimaad: [
    'Belgrade', 'Skopje', 'Tirana', 'Sarajevo', 'Podgorica', 
    'Bucharest', 'Sofia'
  ],
  saared: [
    'Madeira (Funchal)', 'Tenerife', 'Mallorca', 'Santorini', 'Rhodes', 
    'Corsica', 'Malta', 'Ibiza', 'Crete'
  ],
  idaEuroopaJaKaukaasia: [
    'Moscow', 'St. Petersburg', 'Kyiv', 'Minsk', 
    'Yerevan', 'Tbilisi', 'Baku'
  ]
};

export const categoryDisplayNames: Record<keyof typeof cityCategories, string> = {
  rannareis: 'Rannareis',
  suurlinnad: 'Suurlinnad',
  keskEuroopa: 'Kesk-Euroopa',
  pohjaEuroopa: 'Põhja-Euroopa',
  vahemeri: 'Vahemeri',
  keskAasia: 'Kesk-Aasia',
  lahisIda: 'Lähis-Ida',
  balkanimaad: 'Balkanimaad',
  saared: 'Saared',
  idaEuroopaJaKaukaasia: 'Ida-Euroopa ja Kaukaasia'
};