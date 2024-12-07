
type Point = {
    x: number;
    y: number;
  };
  
  class GridNavigator {
    private grid: string[][];
    private rows: number;
    private cols: number;
    private directions: Point[];
  
    constructor(gridList: string[]) {
      this.grid = gridList.map(row => row.split(''));
      this.rows = this.grid.length;
      this.cols = this.grid[0].length;
      this.directions = [
        { x: -1, y: 0 }, // up
        { x: 1, y: 0 },  // down
        { x: 0, y: -1 }, // left
        { x: 0, y: 1 },  // right
        { x: -1, y: -1 }, // up-left
        { x: -1, y: 1 },  // up-right
        { x: 1, y: -1 },  // down-left
        { x: 1, y: 1 },   // down-right
      ];
    }
  
   
    public findShortestPath(start: Point, end: Point): Point[] {
        const visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
        const queue: { point: Point; path: Point[] }[] = [{ point: start, path: [start] }];
        visited[start.x][start.y] = true;
      
        while (queue.length > 0) {
          const { point, path } = queue.shift()!;
          const { x, y } = point;
      
          if (x === end.x && y === end.y) return path;
      
          for (const dir of this.directions) {
            const newX = x + dir.x;
            const newY = y + dir.y;
      
            if (this.isValidCell(newX, newY, visited)) {
              visited[newX][newY] = true;
              queue.push({
                point: { x: newX, y: newY },
                path: [...path, { x: newX, y: newY }],
              });
            }
          }
        }
      
        return [];
      }
      
    private isValidCell(x: number, y: number, visited: boolean[][]): boolean {
      return (
        x >= 0 &&
        x < this.rows &&
        y >= 0 &&
        y < this.cols &&
        this.grid[x][y] === '.' && 
        !visited[x][y]            
      );
    }
  }
  
  function runner(gridList: string[], start: Point, end: Point): Point[] {
    const navigator = new GridNavigator(gridList);
    return navigator.findShortestPath(start, end);
  }
  
  // Example usage
  const result = runner(
    [
      '.X.',
      '.X.',
      '...',
    ], 
    { x: 2, y: 1 },
    { x: 0, y: 2 }
  );
  console.log(result);
  