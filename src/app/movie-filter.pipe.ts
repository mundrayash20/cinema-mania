import { PipeTransform, Pipe } from '@angular/core';
import { Movie } from './app.model';

@Pipe({
    name: 'movieFilter'
})
export class movieFilterPipe implements PipeTransform {
    transform(movies: Movie[], searchTerm: string): Movie[] {
        if (!movies || !searchTerm) {
            return movies;
        }

        return movies.filter(movie =>
            movie.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
