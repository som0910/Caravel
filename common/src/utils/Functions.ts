export function isGuid(value: string): boolean {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const match = regex.exec(value)
    return match != null
  }
  
  export function groupBy<T>(
    metrics: T[],
    keyExtractor: (m: T) => string
  ): { key: string; values: T[] }[] {
    const reduced = metrics.reduce<{ key: string; values: T[] }[]>((arr, m) => {
      const date = keyExtractor(m)
      const existing = arr.find((i) => i.key === date)
      if (existing) {
        existing.values.push(m)
      } else {
        arr.push({
          key: date,
          values: [m],
        })
      }
      return arr
    }, [])
    return reduced
  }
  
  export function median(values: number[]): number | undefined {
    if (values.length === 0) return undefined
    values.sort(function (a, b) {
      return a - b
    })
    const half = Math.floor(values.length / 2)
    if (values.length % 2) return values[half]
    return (values[half - 1] + values[half]) / 2.0
  }
  
  export function stringToColor(string: string): string {
    let hash = 0
    let i
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }
  
    let color = '#'
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */
  
    return color
  }
  