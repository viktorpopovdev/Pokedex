// import React from 'react';
import { Card, Image, Text, Badge, Group } from '@mantine/core';
import styles from './PokemonItem.module.scss';
import { choseColorForBadge } from '../../utils/color';

function PokemonItem({ pokemon, setIsOpen, setActivePokemon }) {
  console.log('Pokemon:', pokemon);
  return (
    <Card
      classNames={{
        root: styles.cardItem,
      }}
      shadow="sm"
      padding="lg"
      radius="md"
      bg={'white'}
      withBorder
      onClick={() => {
        if (pokemon) {
          setIsOpen(true);
          setActivePokemon(pokemon.id);
        }
      }}
    >
      <Card.Section>
        <Image src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      </Card.Section>
      <Text classNames={{ root: styles.title }}>{pokemon.name}</Text>
      <Group classNames={{ root: styles.group }}>
        {pokemon.types.map((pokemonType) => {
          const colorBadge = choseColorForBadge(pokemonType.type.name);
          return (
            <Badge color={colorBadge} key={pokemon.id + pokemonType.type.name} classNames={{ root: styles.badge }}>
              {pokemonType.type.name}
            </Badge>
          );
        })}
      </Group>
    </Card>
  );
}

export default PokemonItem;
