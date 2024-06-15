import ffmpeg from "fluent-ffmpeg";

export async function convertMP3ToOgg(input: string) {
    await new Promise((res) => {
        ffmpeg(input)
            .save(`.sounds/${input.replace(/\.mp3/g, '')}.ogg`)
            .on('end', () => {
                console.log('Conversion done', new Date(), input);
                res;
            });
    });
};