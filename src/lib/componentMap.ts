import SitecoreDonutCard from '@/components/sitecore/SitecoreDonutCard'
// Add more component imports as you create them
// import Heading from '@/components/sitecore/Heading'

// Maps Sitecore componentName to React component
const componentMap: Record<string, React.ComponentType<any>> = {
    'DonutCard': SitecoreDonutCard,
    // 'Heading': Heading,
}

export function getComponent(componentName: string) {
    return componentMap[componentName] || null
}
