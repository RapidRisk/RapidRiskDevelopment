# RapidRisk™ Development Branch

## Overview
RapidRisk™ is a sophisticated financial market analysis tool designed to provide real-time risk assessment and market insights. This development branch contains the latest features and improvements being worked on.

## Features in Development

### 1. Risk Analysis Dashboard
- Real-time monitoring of 50+ risk metrics
- Categorized risk indicators:
  - Market Risk (VIX, volatility, market breadth)
  - Portfolio Analysis (position sizing, VaR, diversification)
  - Economic Indicators (rates, inflation, GDP)
  - Sentiment Analysis (news, social media)
  - Credit Risk Metrics
  - Liquidity Risk Factors
  - Currency Risk Analysis
  - Geopolitical Risk Assessment

### 2. Interactive UI Components
- Modern terminal-inspired interface
- Collapsible risk category panels
- Real-time search functionality
- Color-coded risk indicators:
  - 🟢 Positive (Green)
  - 🔴 Negative (Red)
  - 🟡 Warning (Yellow)
  - ⚪ Neutral (Gray)

### 3. Technical Stack
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Font**: Outfit (UI) & JetBrains Mono (Data)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/RapidRisk.git
cd RapidRisk
```

2. Switch to development branch:
```bash
git checkout development
```

3. Install dependencies:
```bash
npm install
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Development Guidelines

### Code Structure
- `/src/components` - Reusable UI components
- `/src/app` - Next.js app router pages
- `/src/styles` - Global styles and Tailwind configuration

### Component Architecture
- Server Components: Layout, routing
- Client Components: Interactive elements (SearchBar, RiskDashboard)
- Strict typing with TypeScript

### Styling Conventions
- Use Tailwind CSS classes
- Follow terminal-inspired design system
- Maintain consistent color scheme:
  ```
  trading-text-primary: White text
  trading-text-secondary: Muted text
  trading-text-accent: Accent/Warning
  trading-text-positive: Success/Positive
  trading-text-negative: Error/Negative
  ```

## Current Development Focus
1. Real-time data integration
2. Advanced risk calculation algorithms
3. User customization features
4. Performance optimization
5. Additional risk metrics

## Testing
- Run tests: `npm test`
- E2E testing: `npm run test:e2e`
- Component testing: `npm run test:components`

## Contributing
1. Create feature branch from development
2. Follow TypeScript strict mode
3. Maintain test coverage
4. Submit PR with detailed description

## Disclaimer
⚠️ Warning: Capital at risk. RapidRisk™ is a market analysis tool, not a financial advisor.

## License
Proprietary software. All rights reserved.