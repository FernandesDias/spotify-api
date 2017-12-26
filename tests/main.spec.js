import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import {search, searchAlbums, searchArtists, searchTracks, searchPlaylist} from '../src/main';

describe('Spotify Wrapper', () =>{
    
    //smoke tests
    describe('Smoke tests', () =>{
        
        //search (generico) - + de um tipo
        //searchAlbums
        //searchArtists
        //searchTracks
        //searchPlaylists
        
        it('should exist the search method', () =>{
            expect(search).to.exist;
        });
        
        it('should exist the seachAlbums method', () =>{
            expect(searchAlbums).to.exist;
        });
        
        it('should exist the searchArtists method', () =>{
            expect(searchArtists).to.exist;
        });
        
        it('should exist the searchTracks method', () =>{
            expect(searchTracks).to.exist;
        });
        
        it('should exist the searchPlaylist method', () =>{
            expect(searchPlaylist).to.exist;
        });
    });
    
    describe('Genetic Search', () =>{
        
        let fetchedStub;
        let promisse; 
        
        beforeEach( () => {
            fetchedStub = sinon.stub(global, 'fetch');
            promisse = fetchedStub.returnsPromise();
        });
        
        afterEach( () =>{
            fetchedStub.restore();
        });
        
        it('should call fetch function', () =>{
            
            const artists = search();
            //espero
            expect(fetchedStub).to.have.been.calledOnce;
        });
        
        if('should receive the correct url to fecth', () =>{
            
            context('passing one type', () =>{               
                const artists = search('Incubus', 'artist');
                expect(fetchedStub).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
                
                const albums = search('Incubus', 'album');
                expect(fetchedStub).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
            });
            
            context('passing more than one type', () =>{                
                const artistsAndAlbuns = search('Incubus', ['artist','album']);
                expect(fetchedStub).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
            });
        });
        
        it('should return the Json data from the promisse', () =>{
            promisse.resolves({body: 'json'});
            const artists = search('Incubus', 'artist');

            expect(artists.resolveValue).to.been.eql({body: 'json'});
        });
    });
});